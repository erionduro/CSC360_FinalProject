namespace DBIncidents{
public class Incident
{
    public int Id { get; set; }
    public Header? Header { get; set; }
    public RACI? Raci { get; set; }
    public Timeline? Timeline { get; set; }
    public Documentation? Documentation { get; set; }
}
}