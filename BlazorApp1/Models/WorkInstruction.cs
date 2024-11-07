using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FRIWOApp.Models
{
    public class WorkInstruction
    {
        public string? WorkInstructionId { get; set; }

        public string? WorkInstructionName { get; set; }

        public string? Status { get; set; }

        public string? PartPCBA { get; set; }

        public string? PartComponent { get; set; }

        public string? Station { get; set; }

        public DateTime? CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public string? EmployeeId { get; set; }

        public string? EmployeeName { get; set;}
        public string? WorkContent { get; set;}
        public string? WCenterNo { get; set; }
        public string? Version { get; set; }
    }
}
