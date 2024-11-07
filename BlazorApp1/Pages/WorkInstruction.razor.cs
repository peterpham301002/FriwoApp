
using Microsoft.AspNetCore.Components;
using FRIWOApp.Models;
using System.Data;
using FRIWOApp.Services;
using FRIWOApp.Services.Interfaces;
using Syncfusion.Blazor;
using Syncfusion.Pdf;
using Syncfusion.Blazor.SfPdfViewer;
using System.Reflection;
using System.Web;
using Syncfusion.Pdf.Graphics;
using Syncfusion.Pdf.Parsing;
using Syncfusion.Pdf.Security;
using Syncfusion.Blazor.Inputs;
using Syncfusion.Drawing;
using System.Security.Cryptography.X509Certificates;
using System.IO;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using static System.Net.WebRequestMethods;
using Blazored.Toast.Services;
using HarfBuzzSharp;

using Syncfusion.OCRProcessor;
using static System.Net.Mime.MediaTypeNames;
using Blazored.Toast.Configuration;
using Syncfusion.Blazor.Notifications;
using Syncfusion.Blazor.Popups;
using System.Threading;

namespace FRIWOApp.Pages
{

    public partial class WorkInstruction
    {
        [Inject]
        public IWorkInstructionService? _WorkInstructionService { get; set; }
        [Inject]
        public Models.WorkInstruction? WorkInstrct { get; set; }
        [Inject]
        public WorkInstructionService? WorkInstructionService { get; set; }
        [Inject]
        public NavigationManager? NavigationManager { get; set; }
        [Inject]
        public HttpClient? Http { get; set; }
        [Inject]
        public IToastService? ToastService { get; set; }    
        public string? OrderPCB { get; set; }
        public List<string>? OrderPCBs { get; set; } = new List<string>()!;

        public string? PartPCB { get; set; }
        public string? PartPCBOp { get; set; }
        public List<string>? PartPCBs { get; set; } = new List<string>();

        public string? Station { get; set; }
        public List<string>? Stations { get; set; } = new List<string>();

        public string? Component { get; set; }
        public string? ComponentOp { get; set; }
        public List<string>? Components { get; set; } = new List<string>();
        public Warehouse WHTransfer = new Warehouse();

        //SfPdfViewer2 viewer;
        public string? PdfPath { get; set; } = "MauiApp1.wwwroot.data.a4.pdf";
        public string? DocumentPath { get; set; } = "";
        public string? DocumentOp { get; set; } = "";
        public string? Warehouse { get; set; } = "";
        public bool Visibility { get; set; } = false;
        public bool VisibilityInfo { get; set; } = false;
        public bool VisibilitySign { get; set; } = false;  
        public bool ShowButton { get; set; } = false;
        SfTextBox? ComponentTextBox
        {
            get; set;
        }
        SfTextBox? UserIDTextBox
        {
            get; set;
        }
        SfTextBox? UserNameTextBox
        {
            get; set;
        }
        SfTextBox? WarehouseCode 
        { 
            get;set; 
        }
        private bool isChecked = false;
        private bool isCheckedOp = false;
        private bool _loading { get; set; } = false;
        public event EventHandler<dynamic> DataChanged = (sender, value) => { };
        public bool Loading
        {
            get => _loading;
            set
            {
                _loading = value;
                DataChanged?.Invoke(this, value);

            }
        }
        public string? UserID { get; set; }
        public string? UserName { get; set; }
        public string? Base64String { get; set; }
        public string? Base64StringOp { get; set; }
        public string? Rev {  get; set; }
        public string? RevOP { get; set; }
        public string? QPA { get; set; }    
        SfPdfViewer2? viewer;

        protected async override void OnInitialized()
        {
            try
            {
                PartPCBs = new List<string>();
                var rs = await LoadData();
                foreach (var item in rs)
                {
                    PartPCBs.Add(item.ToString());
                }
                Components = new List<string>();
                string base64String = "";
                string base64prefix = "data:application/pdf;base64,";
                //DocumentPath = $"{base64prefix}{base64String}";
                ToastService?.ShowInfo("Load done");
            }
            catch (Exception ex)
            {
                ToastService?.ShowError(ex.Message);
            }
        }
        public async Task<List<string>> LoadData()
        {
            return await _WorkInstructionService?.GetMasterBOMPart()!;
        }
        public async void keyup(Microsoft.AspNetCore.Components.Web.KeyboardEventArgs args)
        {
            if (args.Key == "Enter")
            {
                WIProperties rs = await _WorkInstructionService?.GetWorkByComponent("", Component!)!;
                Base64String = rs.Base64Content;
                if (!string.IsNullOrEmpty(Base64String))
                {
                    string base64prefix = "data:application/pdf;base64,";
                    DocumentPath = $"{base64prefix}{Base64String}";
                    ToastService?.ShowInfo("Load document successful");
                }
                else
                {
                    ToastService?.ShowError($"Can not find document with comoponent {Component}");
                }
            }
            StateHasChanged();
        }
        void InputHandler(Microsoft.AspNetCore.Components.ChangeEventArgs e)
        {
            if (string.IsNullOrEmpty(e.Value?.ToString()))
            {
                Component = ComponentTextBox?.Value;
            }
        }
        public async void OnPartSelected(Syncfusion.Blazor.DropDowns.ChangeEventArgs<string, string> args)
        {
            Components = new List<string>();
            PartPCB = args.ItemData;
            var rs = await _WorkInstructionService?.GetComponentPartByPartPCB(args.ItemData)!;
            foreach (var item in rs)
            {
                Components.Add(item.ToString());
            }
            StateHasChanged();
        }
        public async void OnComponentSelected(Syncfusion.Blazor.DropDowns.ChangeEventArgs<string, string> args)
        {
            try
            {
                ToastService?.ShowInfo("Loading", settings =>
                {
                    settings.AdditionalClasses = "custom-toast-class"; // Optional additional classes
                    settings.IconType = IconType.Material;
                    settings.ShowProgressBar = true;
                    settings.Timeout = 5000; // Set the timeout in milliseconds
                    settings.ShowCloseButton = true;
                    settings.DisableTimeout = true;
                });
                string? tempPart = PartPCB;
                Component = args.ItemData;
                if (PartPCB!.Length == 8 && PartPCB.ToString()[0] == '0')
                {
                    tempPart = PartPCB.ToString().Substring(1);
                }

                WIProperties rs = await _WorkInstructionService?.GetWorkByComponent(tempPart!, "Prepping")!;
                Base64String = rs.Base64Content;
                Rev = rs.Rev;
                ToastService?.ClearAll();
                if (!string.IsNullOrEmpty(Base64String))
                {
                    string base64prefix = "data:application/pdf;base64,";
                    DocumentPath = $"{base64prefix}{Base64String}";                   
                    ToastService?.ShowSuccess("Load document successful");
                }
                else
                {
                    ToastService?.ShowError($"Can not find document with part PCB {PartPCB} and comoponent {args.ItemData}");
                }                                  
            }catch(Exception ex)
            {
                ToastService?.ShowError(ex.Message);
            }
            StateHasChanged();
        }
        public void OnVerifyClick()
        {
            this.Visibility = true;
        }

        private async void OnBtnClick()
        {
            byte[] pdfBytes = Convert.FromBase64String(Base64String!);
            using (MemoryStream pdfStream = new MemoryStream(pdfBytes))
            {
                try
                {
                    PdfLoadedDocument loadedDocument = new PdfLoadedDocument(pdfStream);
                    PdfCertificate pdfCertificate = new PdfCertificate(await Http?.GetStreamAsync(NavigationManager?.BaseUri + "PDF.pfx")!, "syncfusion");
                    PdfSignature signature = new PdfSignature(loadedDocument, loadedDocument.Pages[0], pdfCertificate, UserID!);
                    signature.DocumentPermissions = PdfCertificationFlags.AllowComments | PdfCertificationFlags.AllowFormFill | PdfCertificationFlags.ForbidChanges;
                    signature.Bounds = new Syncfusion.Drawing.RectangleF(0, 0, 350, 100);  // Position of the signature
                    signature.Reason = "Confirm work instruction";
                    signature.SignedName = UserID!;
                    PdfStandardFont font = new PdfStandardFont(PdfFontFamily.Helvetica, 8);
                    signature.Appearance.Normal.Graphics.DrawString($"Digitally Signed by {UserID} {UserName}", font, PdfBrushes.Red, 120, 17);
                    signature.Appearance.Normal.Graphics.DrawString($"Time: {DateTime.Now}", font, PdfBrushes.Red, 120, 27);
                    using (MemoryStream signedStream = new MemoryStream())
                    {
                        loadedDocument.Save(signedStream);
                        loadedDocument.Close(true);
                        string cv = Convert.ToBase64String(signedStream.ToArray());
                        string base64prefix = "data:application/pdf;base64,";
                        DocumentPath = $"{base64prefix}{cv}";
                    }
                    ToastService?.ShowSuccess("Signed Successful!");
                }
                catch (Exception ex)
                {
                    ToastService?.ShowError(ex.Message);
                }
            }
            UserID = string.Empty;
            UserName = string.Empty;
            Visibility = false;
            await InsertWI("QC");
            StateHasChanged();
            //await Verify();
        }

        private void DialogOpen(Object args)
        {
            this.ShowButton = false;
        }
        private void DialogClose(Object args)
        {
            this.ShowButton = true;
        }
        public async Task InsertWI(string flag)
        {
            try
            {
                Models.WorkInstruction work = new Models.WorkInstruction();
                work.WorkInstructionName = "";
                work.Station = "IC";
                
                if(flag == "QC")
                {
                    work.PartPCBA = PartPCB;
                    work.PartComponent = Component;
                    work.Status = "QC Checked";
                    work.Version = Rev?.Replace("-REL.PDF","");
                    work.WorkContent = DocumentPath;
                }                
                else
                {
                    work.PartPCBA = PartPCBOp;
                    work.PartComponent = ComponentOp;
                    work.Status = "Opereator Signed";
                    work.Version = RevOP?.Replace("-REL.PDF", ""); ;
                    work.WorkContent = DocumentOp;
                }                        
                work.CreatedAt = DateTime.Now;
                work.UpdatedAt = DateTime.Now;  
                work.EmployeeId = UserID;
                work.EmployeeName = UserName;
                work.WCenterNo = "";
                
                if (await _WorkInstructionService?.InsertWI(work)! == "OK")
                    ToastService?.ShowSuccess("Insert successful");               
            }
            catch (Exception ex) 
            {
                ToastService?.ShowError("Insert WI: \n" + ex.Message);
            }
        }



        /// <summary>
        /// Operator Side
        /// </summary>
        /// <returns></returns>
        public async void keyupOp(Microsoft.AspNetCore.Components.Web.KeyboardEventArgs args)
        {
            if (args.Key == "Enter")
            {
                WorkInstrct = await _WorkInstructionService?.GetWorkOp("", "Prepping")!;
                if (WorkInstrct != null)
                {
                    if (!string.IsNullOrEmpty(WorkInstrct.WorkContent))
                    {
                        DocumentOp = WorkInstrct.WorkContent;
                        ToastService?.ShowInfo("Load document successful");
                    }
                    else
                    {
                        ToastService?.ShowError($"Can not find document with comoponent {ComponentOp}");
                    }
                }
                else
                {
                    ToastService?.ShowError($"Can not find document with comoponent {ComponentOp}");
                }
            }
            StateHasChanged();
        }
        void InputHandlerOp(Microsoft.AspNetCore.Components.ChangeEventArgs e)
        {
            if (string.IsNullOrEmpty(e.Value?.ToString()))
            {
                ComponentOp = ComponentTextBox?.Value;
            }
        }
        public async void OnComponentSelectedOp(Syncfusion.Blazor.DropDowns.ChangeEventArgs<string, string> args)
        {
            //try
            //{
            //    ComponentOp = args.ItemData;
            //    WorkInstrct = await _WorkInstructionService?.GetWorkOp(PartPCBOp!, "Prepping")!;
            //    if(WorkInstrct != null)
            //    {
            //        if (!string.IsNullOrEmpty(WorkInstrct.WorkContent))
            //        {
            //            DocumentOp = WorkInstrct.WorkContent;
            //            ToastService?.ShowInfo("Load document successful");
            //        }
            //        else
            //        {
            //            ToastService?.ShowError($"Can not find document with part PCB {PartPCBOp} and comoponent {args.ItemData}");
            //        }
            //    }
            //    else
            //    {
            //        ToastService?.ShowError($"Can not find document with part PCB {PartPCBOp} and comoponent {args.ItemData}");
            //    }
            //}
            //catch (Exception ex)
            //{
            //    ToastService?.ShowError(ex.Message);
            //}
            //StateHasChanged();
        }

        public async void keyupWarehouse(Microsoft.AspNetCore.Components.Web.KeyboardEventArgs args)
        {
            string component = string.Empty;
            if (args.Key == "Enter")
            {
                ToastService?.ShowInfo("Loading", settings =>
                {
                    settings.AdditionalClasses = "custom-toast-class"; // Optional additional classes
                    settings.IconType = IconType.Material;
                    settings.ShowProgressBar = true;
                    settings.Timeout = 5000; // Set the timeout in milliseconds
                    settings.ShowCloseButton = true;
                    settings.DisableTimeout = true;
                });
                try
                {
                    var rs = Warehouse?.Split(" "); //0+4
                    WHTransfer = await _WorkInstructionService?.GetWHcodeData(Warehouse!)!;
                    QPA = await _WorkInstructionService?.GetQPA(WHTransfer.PartNo, WHTransfer.ComponentPart)!;
                    if (rs[4].ToString().Length == 8 && rs[4].ToString()[0] == '0')
                        rs[4] = rs[4].ToString().Substring(1);

                    if (rs[0].ToString().Length == 8 && rs[0].ToString()[0] == '0')
                        rs[0] = rs[0].ToString().Substring(1);
                    
                    PartPCBOp = rs[4].ToString();
                    ComponentOp = rs[0].ToString();
                    WIProperties wi = await _WorkInstructionService?.GetWorkByComponent(rs[4].ToString(), "Prepping")!;
                    Base64StringOp = wi.Base64Content;
                    RevOP = wi.Rev;
                    ToastService?.ClearAll();
                    if (!string.IsNullOrEmpty(Base64StringOp))
                    {
                        string base64prefix = "data:application/pdf;base64,";
                        DocumentOp = $"{base64prefix}{Base64StringOp}";                        
                        ToastService?.ShowSuccess("Load document successful");
                    }
                    else
                    {
                        ToastService?.ShowError($"Can not find document");
                    }                  
                }
                catch (Exception ex)
                {
                    ToastService?.ShowError(ex.Message);
                }
                Warehouse = string.Empty;
                //SearchText(component);
            }
            StateHasChanged();
        }
        void InputHandlerWarehouse(Microsoft.AspNetCore.Components.ChangeEventArgs e)
        {
            if (string.IsNullOrEmpty(e.Value?.ToString()))
            {
                Warehouse = WarehouseCode?.Value;               
            }
        }
        public void OnInfoClick()
        {
            this.VisibilityInfo = true;
        }

        public void OnSignClick()
        {
            this.VisibilitySign = true;
        }

        private async void OnOpConfirmClick()
        {
            byte[] pdfBytes = Convert.FromBase64String(Base64StringOp!);
            using (MemoryStream pdfStream = new MemoryStream(pdfBytes))
            {
                try
                {
                    PdfLoadedDocument loadedDocument = new PdfLoadedDocument(pdfStream);
                    PdfCertificate pdfCertificate = new PdfCertificate(await Http?.GetStreamAsync(NavigationManager?.BaseUri + "PDF.pfx")!, "syncfusion");
                    PdfSignature signature = new PdfSignature(loadedDocument, loadedDocument.Pages[0], pdfCertificate, UserID!);
                    signature.DocumentPermissions = PdfCertificationFlags.AllowComments | PdfCertificationFlags.AllowFormFill | PdfCertificationFlags.ForbidChanges;
                    signature.Bounds = new Syncfusion.Drawing.RectangleF(0, 0, 350, 100);  // Position of the signature
                    signature.Reason = "Confirm work instruction";
                    signature.SignedName = UserID!;
                    PdfStandardFont font = new PdfStandardFont(PdfFontFamily.Helvetica, 8);
                    signature.Appearance.Normal.Graphics.DrawString($"Digitally Signed by {UserID} {UserName}", font, PdfBrushes.Red, 120, 17);
                    signature.Appearance.Normal.Graphics.DrawString($"Time: {DateTime.Now}", font, PdfBrushes.Red, 120, 27);

                    using (MemoryStream signedStream = new MemoryStream())
                    {
                        loadedDocument.Save(signedStream);
                        loadedDocument.Close(true);
                        string cv = Convert.ToBase64String(signedStream.ToArray());
                        string base64prefix = "data:application/pdf;base64,";
                        DocumentOp = $"{base64prefix}{cv}";
                    }
                    ToastService?.ShowSuccess("Signed Successful!");
                }
                catch (Exception ex)
                {
                    ToastService?.ShowError(ex.Message);
                }
            }
            await InsertWI("Operator");
            UserID = string.Empty;
            UserName = string.Empty;
            PartPCB = string.Empty;
            VisibilitySign = false;            
            StateHasChanged();
            //await Verify();
        }

        public async void SearchText(string text)
        {
            await viewer!.SearchTextAsync(text, false);
            StateHasChanged();
        }

        //public async Task Verify()
        //{
        //    string base64Pdf = DocumentPath.Replace("data:application/pdf;base64,", "");
        //    byte[] pdfBytes = Convert.FromBase64String(base64Pdf);
        //    using (MemoryStream pdfStream = new MemoryStream(pdfBytes))
        //    {
        //        //Load an existing PDF document.
        //        PdfLoadedDocument document = new PdfLoadedDocument(pdfStream);
        //        //Load PDF form.
        //        PdfLoadedForm form = document.Form;

        //        if (form != null)
        //        {
        //            foreach (PdfLoadedField field in form.Fields)
        //            {
        //                if (field is PdfLoadedSignatureField)
        //                {
        //                    PdfLoadedSignatureField signatureField = field as PdfLoadedSignatureField;

        //                    //Check whether the signature is signed.
        //                    if (signatureField.IsSigned)
        //                    {
        //                        //Validate the digital signature.
        //                        //PdfSignatureValidationResult result = signatureField.ValidateSignature();

        //                        //if (result.IsSignatureValid)
        //                        //    Console.WriteLine("Signature is valid");
        //                        //else
        //                        //    Console.WriteLine("Signature is invalid");

        //                        //Retrieve the signature information.
        //                        Console.WriteLine("<<<<Validation summary>>>>>>");
        //                        Console.WriteLine("Digitally Signed by: " + signatureField.Signature.Certificate.IssuerName);
        //                        Console.WriteLine("Valid From: " + signatureField.Signature.Certificate.ValidFrom);
        //                        Console.WriteLine("Valid To: " + signatureField.Signature.Certificate.ValidTo);
        //                        //Console.WriteLine("Signature Algorithm : " + result.SignatureAlgorithm);
        //                        //Console.WriteLine("Hash Algorithm : " + result.DigestAlgorithm);
        //                        //Console.WriteLine("Cryptographics Standard : " + result.CryptographicStandard);
        //                        Console.Read();
        //                    }
        //                }
        //            }
        //        }
        //    }
        //}
    }
}