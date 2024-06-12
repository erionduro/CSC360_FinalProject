namespace DBIncidents
{
public class RACI
{
    public int Id { get; set; }
    public List<string>? ResponsibleParties { get; set; }
    public List<string>? AccountableParties { get; set; }
    public List<string>? ConsultedParties { get; set; }
    public List<string>? InformedParties { get; set; }
}
}