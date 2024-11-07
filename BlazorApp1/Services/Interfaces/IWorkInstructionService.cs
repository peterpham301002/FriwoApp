using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using FRIWOApp.Models;

namespace FRIWOApp.Services.Interfaces
{
    public interface IWorkInstructionService
    {
        Task<List<string>>? GetMasterBOMPart();
        Task<List<string>>? GetComponentPartByPartPCB(string partPCB);
        Task<WIProperties>? GetWorkByComponent(string partPCB, string component);
        Task<WIProperties>? GetWorkByComponentNotRel(string partPCB, string component);
        Task<string>? InsertWI(Models.WorkInstruction wi);
        Task<string>? InsertAsPDF(string base64, string filename);
        /// <summary>
        /// Operator Side
        /// </summary>
        /// <param name="part"></param>
        /// <param name="component"></param>
        /// <returns></returns>
        Task<Models.WorkInstruction>? GetWorkOp(string part, string component);
        Task<Warehouse>? GetWHcodeData(string code);
        Task<string>? GetQPA(string part, string compart);
    }
}
