namespace DBIncidents
{
public class Timeline
{
    public int Id { get; set; }
    public long? CreationTimestamp { get; set; }
    public long? InProgressTimestamp { get; set; }
    public long? ValidationTimestamp { get; set; }
    public long? ClosedTimestamp { get; set; }
}
}