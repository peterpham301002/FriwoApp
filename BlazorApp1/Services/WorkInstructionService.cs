using System;
using System.Collections.Generic;
using System.IO.Pipes;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Text.Json.Nodes;
using System.Threading.Tasks;
using FRIWOApp.Models;
using FRIWOApp.Services.Interfaces;
using Newtonsoft.Json;
using Syncfusion.Blazor.Data;

namespace FRIWOApp.Services
{
    public class WorkInstructionService:IWorkInstructionService
    {
        readonly HttpClient _httpClient;

        public WorkInstructionService(HttpClient httpClient)
        {
            _httpClient = httpClient;
            _httpClient.BaseAddress = new Uri("https://fvn-s-web01.friwo.local:7033/");
        }

        public async Task<List<string>>? GetMasterBOMPart()
        {
            List<string> masterBOMPart = new List<string>();
            try
            {
                var rs = await _httpClient.GetAsync($"api/VProductionPlan/pcb");///VProductionPlan/pcb
                return await rs.Content.ReadFromJsonAsync<List<string>>() ?? new List<string>();
                //var rs = await _httpClient.GetAsync($"api/SapMasterBOM/GetDataSAPBOM");
                //List<SapMasterBOM> rs1 = System.Text.Json.JsonSerializer.Deserialize<List<SapMasterBOM>>(await rs.Content.ReadAsStringAsync())!;
                //foreach(var item in  rs1)
                //{
                //    masterBOMPart.Add( item.PartNo.ToString());
                //}
                //return masterBOMPart;
            }
            catch (Exception ex)
            {
                Console
                    .WriteLine(ex.Message);
                return new List<string>();
            }

            //try
            //{
            //    //var rs = await _httpClient.GetAsync("https://localhost:7003/api/VProductionPlan");
            //    //.Content.ReadFromJsonAsync<List<SapMasterBOM>>();

            //    var client = new HttpClient();
            //    var request = new HttpRequestMessage(HttpMethod.Get, "https://localhost:7003/api/SapMasterBOM/GetDataSAPBOM");
            //    var response = await client.SendAsync(request);
            //    response.EnsureSuccessStatusCode();
            //    return JsonSerializer.Deserialize<List<string>>(await response.Content.ReadAsStringAsync());



            //}
            //catch (Exception ex)
            //{
            //    return null;
            //}
        }

        public async Task<List<string>>? GetComponentPartByPartPCB(string partPCB)
        {
            try
            {
                var rs = await _httpClient.GetAsync($"/api/SapMasterBOM/GetComponentByPartPCB/{partPCB}");
                List<string> rs1 = System.Text.Json.JsonSerializer.Deserialize<List<string>>(await rs.Content.ReadAsStringAsync())??new List<string>()!;
                return rs1;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return new List<string>();
            }

           
        }

        public async Task<WIProperties>? GetWorkByComponent(string partPCB, string component)
        {
            WIProperties rs1 = new WIProperties();
            try
            {
                var rs = await _httpClient.GetAsync($"/api/WordInstuction/GetWorkInsByComponent/{partPCB}/{component}");
                rs1 = System.Text.Json.JsonSerializer.Deserialize <WIProperties> (await rs.Content.ReadAsStringAsync())!;
                return rs1;
            }
            catch (Exception ex)
            {
                Console .WriteLine(ex.Message); 
                return rs1;
            }


        }


        public async Task<WIProperties>? GetWorkByComponentNotRel(string partPCB, string component)
        {
            WIProperties rs1 = new WIProperties();
            try
            {
                var rs = await _httpClient.GetAsync($"/api/WordInstuction/GetWorkInsByComponentNotRel/{partPCB}/{component}");
                rs1 = System.Text.Json.JsonSerializer.Deserialize<WIProperties>(await rs.Content.ReadAsStringAsync())!;
                return rs1;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return rs1;
            }


        }

        public async Task<string>? InsertWI(Models.WorkInstruction wi)
        {
            try
            {
                var client = new HttpClient();
                var content = new StringContent(System.Text.Json.JsonSerializer.Serialize(wi), Encoding.UTF8, "application/json");
                var result = await client.PostAsync("https://fvn-s-web01.friwo.local:7033/api/SapMasterBOM/AddSignedDoc", content);
                return "OK";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return string.Empty;
            }
        }

        public async Task<Models.WorkInstruction>? GetWorkOp(string part, string component)
        {
            try
            {
                var rs = await _httpClient.GetAsync($"/api/SapMasterBOM/GetSignDoc/{part}/{component}");
                return System.Text.Json.JsonSerializer.Deserialize<Models.WorkInstruction>(await rs.Content.ReadAsStringAsync()) ?? new Models.WorkInstruction()!;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                Models.WorkInstruction work = new Models.WorkInstruction();
                return work;
            }
        }

        public async Task<Warehouse>? GetWHcodeData(string code)
        {
            try
            {
                var rs = await _httpClient.GetAsync($"/api/SapMasterBOM/CheckWHcode/{code}");
                return System.Text.Json.JsonSerializer.Deserialize<Models.Warehouse>(await rs.Content.ReadAsStringAsync()) ?? new Models.Warehouse()!;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);  
                return new Models.Warehouse();
            }
        }

        public async Task<string>? InsertAsPDF(string base64, string filename)
        {
            try
            {
                WIProperties wi = new WIProperties();
                wi.Base64Content = base64;
                wi.Filename = filename; 
                var client = new HttpClient();
                var content = new StringContent(System.Text.Json.JsonSerializer.Serialize(wi), Encoding.UTF8, "application/json");
                var result = await client.PostAsync("https://fvn-s-web01.friwo.local:7033/api/WordInstuction/AddToPDF", content);
                return "OK";
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return string.Empty;
            }
        }

        public async Task<string>? GetQPA(string part, string compart)
        {
            try
            {
                var rs = await _httpClient.GetAsync($"/api/SapMasterBOM/GetMiQPA/{part}/{compart}");
                return await rs.Content.ReadAsStringAsync() ?? string.Empty!;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return string.Empty;
            }
        }
    }
}
