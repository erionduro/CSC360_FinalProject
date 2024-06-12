const incidents = [
    {
      header: {
        id: 'INC001',
        title: 'Data Breach Incident',
        type: 'Data Breach',
        impact: 'High',
        urgency: 'High',
        priority: 'High',
        status: 'Open',
        createdTimestamp: 1760288225,
        inProgress: true,
        validation: false,
        closed: false
      },
      raci: {
        responsibleParties: ['IT Security Team'],
        accountableParties: ['Chief Information Security Officer'],
        consultedParties: ['Legal Team'],
        informedParties: ['Executive Management']
      },
      timeline: {
        creationTimestamp: 1760288225,
        inProgressTimestamp: 1760346359,
        validationTimestamp: null,
        closedTimestamp: null
      },
      documentation: {
        description: 'Sensitive customer data was accessed by unauthorized individuals.',
        notes: 'Forensic analysis underway to determine scope and impact.'
      }
    },
    {
      header: {
        id: 'INC002',
        title: 'Phishing Email Incident',
        type: 'Phishing',
        impact: 'Medium',
        urgency: 'High',
        priority: 'Medium',
        status: 'Open',
        createdTimestamp: 1663735376,
        inProgress: true,
        validation: false,
        closed: false
      },
      raci: {
        responsibleParties: ['IT Security Team'],
        accountableParties: ['Chief Information Security Officer'],
        consultedParties: ['End Users'],
        informedParties: ['Help Desk']
      },
      timeline: {
        creationTimestamp: 1663735376,
        inProgressTimestamp: 1663825301,
        validationTimestamp: null,
        closedTimestamp: null
      },
      documentation: {
        description: 'Employees received suspicious emails requesting sensitive information.',
        notes: 'User education and email filtering measures being implemented.'
      }
    },
    {
      header: {
        id: 'INC003',
        title: 'Malware Infection Incident',
        type: 'Malware',
        impact: 'High',
        urgency: 'High',
        priority: 'High',
        status: 'Open',
        createdTimestamp: 1795750060,
        inProgress: true,
        validation: false,
        closed: false
      },
      raci: {
        responsibleParties: ['IT Security Team'],
        accountableParties: ['Chief Information Security Officer'],
        consultedParties: ['IT Operations'],
        informedParties: ['Executive Management']
      },
      timeline: {
        creationTimestamp: 1795750060,
        inProgressTimestamp: 1795853536,
        validationTimestamp: null,
        closedTimestamp: null
      },
      documentation: {
        description: 'Multiple endpoints infected with ransomware.',
        notes: 'Isolation of infected systems and deployment of security patches in progress.'
      }
    },
    {
      header: {
        id: 'INC004',
        title: 'Unauthorized Access Incident',
        type: 'Unauthorized Access',
        impact: 'Medium',
        urgency: 'High',
        priority: 'High',
        status: 'Open',
        createdTimestamp: 1738922602,
        inProgress: false,
        validation: false,
        closed: false
      },
      raci: {
        responsibleParties: ['IT Security Team'],
        accountableParties: ['Chief Information Security Officer'],
        consultedParties: ['Network Operations'],
        informedParties: ['Executive Management']
      },
      timeline: {
        creationTimestamp: 1738922602,
        inProgressTimestamp: null,
        validationTimestamp: null,
        closedTimestamp: null
      },
      documentation: {
        description: 'Unusual network activity detected indicating potential unauthorized access.',
        notes: 'Investigation underway to identify source and scope of access.'
      }
    },
    {
        header: {
          id: 'INC005',
          title: 'Access Permission Error',
          type: 'Access Control',
          impact: 'Low',
          urgency: 'Low',
          priority: 'Low',
          status: 'In Validation',
          createdTimestamp: 1695351359,
          inProgress: true,
          validation: true,
          closed: false
        },
        timeline: {
          creationTimestamp: 1695351359,
          inProgressTimestamp: 1695396235,
          validationTimestamp: 1698396235,
          closedTimestamp: null
        },
        documentation: {
          description: 'Users unable to access certain files due to permission errors.',
          notes: 'File permissions being reviewed and adjusted.'
        }
      },
    {
      header: {
        id: 'INC006',
        title: 'Denial of Service (DoS) Attack Incident',
        type: 'DoS Attack',
        impact: 'High',
        urgency: 'High',
        priority: 'High',
        status: 'Open',
        createdTimestamp: 1733294894,
        inProgress: true,
        validation: false,
        closed: false
      },
      raci: {
        responsibleParties: ['Network Security Team'],
        accountableParties: ['Chief Information Security Officer'],
        consultedParties: ['IT Operations'],
        informedParties: ['Executive Management']
      },
      timeline: {
        creationTimestamp: 1733294894,
        inProgressTimestamp: 1733505275,
        validationTimestamp: null,
        closedTimestamp: null
      },
      documentation: {
        description: 'Website experiencing prolonged downtime due to flood of malicious traffic.',
        notes: 'Mitigation measures being implemented to restore service.'
      }
    },
    {
      header: {
        id: 'INC007',
        title: 'Unauthorized Access Incident',
        type: 'Unauthorized Access',
        impact: 'Medium',
        urgency: 'High',
        priority: 'High',
        status: 'In Validation',
        createdTimestamp: 1656839874,
        inProgress: true,
        validation: true,
        closed: false
      },
      raci: {
        responsibleParties: ['IT Security Team'],
        accountableParties: ['Chief Information Security Officer'],
        consultedParties: ['Network Operations'],
        informedParties: ['Executive Management']
      },
      timeline: {
        creationTimestamp: 1656839874,
        inProgressTimestamp: 1657084596,
        validationTimestamp: 1660084596,
        closedTimestamp: null
      },
      documentation: {
        description: 'Unusual network activity detected indicating potential unauthorized access.',
        notes: 'Investigation underway to identify source and scope of access.'
      }
    },
    {
      header: {
        id: 'INC008',
        title: 'Denial of Service (DoS) Attack Incident',
        type: 'DoS Attack',
        impact: 'High',
        urgency: 'High',
        priority: 'High',
        status: 'Open',
        createdTimestamp: 1758533545,
        inProgress: false,
        validation: false,
        closed: false
      },
      raci: {
        responsibleParties: ['Network Security Team'],
        accountableParties: ['Chief Information Security Officer'],
        consultedParties: ['IT Operations'],
        informedParties: ['Executive Management']
      },
      timeline: {
        creationTimestamp: 1758533545,
        inProgressTimestamp: null,
        validationTimestamp: null,
        closedTimestamp: null
      },
      documentation: {
        description: 'Website experiencing prolonged downtime due to flood of malicious traffic.',
        notes: 'Mitigation measures being implemented to restore service.'
      }
    },
    {
      header: {
        id: 'INC009',
        title: 'Data Breach Incident',
        type: 'Data Breach',
        impact: 'High',
        urgency: 'High',
        priority: 'High',
        status: 'In Validation',
        createdTimestamp: 1741079077,
        inProgress: true,
        validation: true,
        closed: false
      },
      raci: {
        responsibleParties: ['IT Security Team'],
        accountableParties: ['Chief Information Security Officer'],
        consultedParties: ['Legal Team'],
        informedParties: ['Executive Management']
      },
      timeline: {
        creationTimestamp: 1741079077,
        inProgressTimestamp: 1741214022,
        validationTimestamp: 1744214022,
        closedTimestamp: null
      },
      documentation: {
        description: 'Sensitive customer data was accessed by unauthorized individuals.',
        notes: 'Forensic analysis underway to determine scope and impact.'
      }
    },
    {
        header: {
          id: 'INC010',
          title: 'Phishing Email Incident',
          type: 'Phishing',
          impact: 'Medium',
          urgency: 'High',
          priority: 'Medium',
          status: 'Open',
          createdTimestamp: 1626545797,
          inProgress: true,
          validation: false,
          closed: false
        },
        raci: {
          responsibleParties: ['IT Security Team'],
          accountableParties: ['Chief Information Security Officer'],
          consultedParties: ['End Users'],
          informedParties: ['Help Desk']
        },
        timeline: {
          creationTimestamp: 1626545797,
          inProgressTimestamp: 1626595694,
          validationTimestamp: null,
          closedTimestamp: null
        },
        documentation: {
          description: 'Employees received suspicious emails requesting sensitive information.',
          notes: 'User education and email filtering measures being implemented.'
        }
      },
      {
        header: {
          id: 'INC011',
          title: 'Printer Malfunction',
          type: 'Hardware',
          impact: 'Low',
          urgency: 'Low',
          priority: 'Low',
          status: 'Closed',
          createdTimestamp: 1763733519,
          inProgress: true,
          validation: true,
          closed: true
        },
        timeline: {
          creationTimestamp: 1763733519,
          inProgressTimestamp: 1763852879,
          validationTimestamp: 1764152879,
          closedTimestamp: 1764552879
        },
        documentation: {
          description: 'Printer not responding to print requests.',
          notes: 'Troubleshooting ongoing to resolve the issue.'
        }
      },
      {
        header: {
          id: 'INC012',
          title: 'Email Delivery Delay',
          type: 'Email',
          impact: 'Low',
          urgency: 'Low',
          priority: 'Low',
          status: 'Open',
          createdTimestamp: 1786428416,
          inProgress: true,
          validation: false,
          closed: false
        },
        timeline: {
          creationTimestamp: 1786428416,
          inProgressTimestamp: 1786527755,
          validationTimestamp: null,
          closedTimestamp: null
        },
        documentation: {
          description: 'Users experiencing delays in receiving emails.',
          notes: 'Email server performance being investigated.'
        }
      },
      {
        header: {
          id: 'INC013',
          title: 'Malware Infection Incident',
          type: 'Malware',
          impact: 'High',
          urgency: 'High',
          priority: 'High',
          status: 'Closed',
          createdTimestamp: 1700525772,
          inProgress: true,
          validation: true,
          closed: true
        },
        raci: {
          responsibleParties: ['IT Security Team'],
          accountableParties: ['Chief Information Security Officer'],
          consultedParties: ['IT Operations'],
          informedParties: ['Executive Management']
        },
        timeline: {
          creationTimestamp: 1700525772,
          inProgressTimestamp: 1700646150,
          validationTimestamp: 1703646150,
          closedTimestamp: 1706646150
        },
        documentation: {
          description: 'Multiple endpoints infected with ransomware.',
          notes: 'Isolation of infected systems and deployment of security patches in progress.'
        }
      },
      {
        header: {
          id: 'INC014',
          title: 'Web Page Formatting Issue',
          type: 'Web Development',
          impact: 'Low',
          urgency: 'Low',
          priority: 'Low',
          status: 'Open',
          createdTimestamp: 1695670542,
          inProgress: true,
          validation: false,
          closed: false
        },
        timeline: {
          creationTimestamp: 1695670542,
          inProgressTimestamp: 1695884749,
          validationTimestamp: null,
          closedTimestamp: null
        },
        documentation: {
          description: 'Web page displaying incorrectly on certain devices.',
          notes: 'CSS code being adjusted to fix the formatting issue.'
        }
      },
  ];
  
  export default incidents;