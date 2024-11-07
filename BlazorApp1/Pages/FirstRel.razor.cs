
using Microsoft.AspNetCore.Components;
using FRIWOApp.Models;
using FRIWOApp.Services;
using FRIWOApp.Services.Interfaces;
using Syncfusion.Pdf.Graphics;
using Syncfusion.Pdf.Parsing;
using Syncfusion.Pdf.Security;
using Syncfusion.Blazor.Inputs;
using Blazored.Toast.Services;

namespace FRIWOApp.Pages
{

    public partial class FirstRel
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
            get; set;
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
        public string? Rev { get; set; }
        public string? RevOP { get; set; }
        public string? FileName { get; set; }
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
                DocumentPath = $"{base64prefix}{base64String}";
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
                string tempPart = PartPCB;
                Component = args.ItemData;
                if (PartPCB.Length == 8 && PartPCB.ToString()[0] == '0')
                {
                   tempPart  = PartPCB.ToString().Substring(1);
                }

                WIProperties rs = await _WorkInstructionService?.GetWorkByComponentNotRel(tempPart!, "Prepping")!;
                Base64String = rs.Base64Content;
                Rev = rs.Rev;
                FileName = rs.Filename;
                if (!string.IsNullOrEmpty(Base64String))
                {
                    string base64prefix = "data:application/pdf;base64,";
                    DocumentPath = $"{base64prefix}{Base64String}";
                    ToastService?.ShowInfo("Load document successful");
                }
                else
                {
                    ToastService?.ShowError($"Can not find document with part PCB {PartPCB} and comoponent {args.ItemData}");
                }
            }
            catch (Exception ex)
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
                    for (int i = 0; i < loadedDocument.PageCount; i++)
                    {
                        PdfSignature signature = new PdfSignature(loadedDocument, loadedDocument.Pages[i], pdfCertificate, UserID!);
                        signature.DocumentPermissions = PdfCertificationFlags.AllowComments | PdfCertificationFlags.AllowFormFill | PdfCertificationFlags.ForbidChanges;
                        signature.Certificated = false;
                        signature.Bounds = new Syncfusion.Drawing.RectangleF(300, 250, 350, 100);  // Position of the signature
                        signature.Reason = "Confirm work instruction";
                        signature.SignedName = UserID!;
                        PdfStandardFont font = new PdfStandardFont(PdfFontFamily.Helvetica, 8);                  
                        signature.Appearance.Normal.Graphics.DrawString($"Effective date/ Ngay hieu luc", font, PdfBrushes.Blue, 120, 17);
                        signature.Appearance.Normal.Graphics.DrawString($"Time: {DateTime.Now}", font, PdfBrushes.Blue, 120, 27);

                        PdfSignature signature2 = new PdfSignature(loadedDocument, loadedDocument.Pages[i], pdfCertificate, UserID!);
                        signature2.DocumentPermissions = PdfCertificationFlags.AllowComments | PdfCertificationFlags.AllowFormFill | PdfCertificationFlags.ForbidChanges;
                        signature2.Certificated = false;
                        signature2.Bounds = new Syncfusion.Drawing.RectangleF(300, 700, 350, 100);  // Position of the signature
                        signature2.Reason = "Confirm work instruction";
                        signature2.SignedName = UserID!;                       
                        signature2.Appearance.Normal.Graphics.DrawString($"Tai lieu goc", font, PdfBrushes.Red, 120, 17);
                        signature2.Appearance.Normal.Graphics.DrawString($"Original", font, PdfBrushes.Red, 120, 27);
                    }
                    
                    using (MemoryStream signedStream = new MemoryStream())
                    {
                        loadedDocument.Save(signedStream);
                        loadedDocument.Close(true);
                        string cv = Convert.ToBase64String(signedStream.ToArray());
                        string base64prefix = "data:application/pdf;base64,";
                        Base64String = cv;
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
            await InsertWI("Release");
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

                if (await _WorkInstructionService?.InsertAsPDF(Base64String!, FileName!)! == "OK")
                    ToastService?.ShowSuccess("Insert successful");
            }
            catch (Exception ex)
            {
                ToastService?.ShowError("Insert WI: \n" + ex.Message);
            }
        }  
    }
}