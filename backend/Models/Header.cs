namespace DBIncidents{
public class Header
{
    public int Id { get; set; }
    public string? HeaderId { get; set; }
    public string? Title { get; set; }
    public string? Type { get; set; }
    public string? Impact { get; set; }
    public string? Urgency { get; set; }
    public string? Priority { get; set; }
    public string? Status { get; set; }
    public long CreatedTimestamp { get; set; }
    public bool InProgress { get; set; }
    public bool Validation { get; set; }
    public bool Closed { get; set; }
}
}