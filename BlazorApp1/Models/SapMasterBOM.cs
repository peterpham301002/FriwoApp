using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FRIWOApp.Models
{
    public class SapMasterBOM
    {
        public string? PartNo { get; set; }
        public string? ComponentPart { get; set; }
        public string? Datuv { get; set; }
        public string? ValidTo { get; set; }
        public string? Uom { get; set; }
        public string? Qty { get; set; }
        public string? PartDes { get; set; }
    }
}
