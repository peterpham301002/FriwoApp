
namespace FRIWOApp.Models
{
    public class Warehouse
    {
        public string? Contract {  get; set; }
        public string? RelNo { get; set; }
        public string? SeqNo { get; set; }
        public int? TransID { get; set;}
        public string? ComponentPart { get; set; }
        public string? PartDes { get; set; }
        public string? Unit { get; set; }
        public string? Loc {  get; set; }
        public int? Qty { get; set; }
        public string? Lotbatch { get; set; }
        public string? OrderNo { get; set; }
        public string? Status { get; set; }
        public string? FromLoc { get; set; }
        public string? ToLoc { get; set; }
        public DateTime? DateTrans { get; set; }
        public DateTime? DateRecei { get; set; }
        public string? Remark1 { get; set; }
        public string? Remark2 { get; set; }
        public string? PartNo { get; set; }
        public string? HUID { get; set; }
        public string? ExpiredMaterialDate { get; set; }
    }
}
