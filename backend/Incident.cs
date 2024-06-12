using System;
using System.Collections.Generic;

namespace Incidents;
public class Incident
{
    public Header header { get; set; }
    public RACI raci { get; set; }
    public Timeline timeline { get; set; }
    public Documentation documentation { get; set; }

    public Incident()
    {
        header = new Header();
        raci = new RACI();
        timeline = new Timeline();
        documentation = new Documentation();
    }
}

public class Header
{
    public string id { get; set; }
    public string title { get; set; }
    public string type { get; set; }
    public string impact { get; set; }
    public string urgency { get; set; }
    public string priority { get; set; }
    public string status { get; set; }
    public long createdTimestamp { get; set; }
    public bool inProgress { get; set; }
    public bool validation { get; set; }
    public bool closed { get; set; }
}

public class RACI
{
    public List<string> responsibleParties { get; set; }
    public List<string> accountableParties { get; set; }
    public List<string> consultedParties { get; set; }
    public List<string> informedParties { get; set; }

    public RACI()
    {
        responsibleParties = new List<string>();
        accountableParties = new List<string>();
        consultedParties = new List<string>();
        informedParties = new List<string>();
    }
}

public class Timeline
{
    public long creationTimestamp { get; set; }
    public long? inProgressTimestamp { get; set; }
    public long? validationTimestamp { get; set; }
    public long? closedTimestamp { get; set; }
}

public class Documentation
{
    public string description { get; set; }
    public string notes { get; set; }
}