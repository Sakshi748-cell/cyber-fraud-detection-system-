Security Architecture

# 1. Project Overview

The Cyber Fraud Detection System is designed to support proactive detection and intervention for suspicious financial activity.

The system uses:

 Data sources from authorized financial and complaint systems

 API Gateway

 Data Processing Layer

 ML Prediction Engine

 Risk Scoring Engine

 Secure Database

 GIS Dashboard

 Alert and Intervention System

 Authorized communication with Police, Banks/FIs and I4C

Security is designed into every layer using a defense-in-depth and least-privilege approach.

--

# 2. Security Objectives

The system must protect:

1 Confidentiality – sensitive financial and personal data must only be accessible to authorized users.

2 Integrity – fraud records, predictions, alerts and evidence must not be altered without authorization.

3 Availability – authorized investigators should be able to access the system when required.

4 Accountability – important actions must be recorded in tamper-evident audit logs.

5 Privacy – only the minimum required personal and financial information should be exposed.

6 Evidence Integrity – digital evidence should be verifiable using cryptographic hashes.

--

# 3. Proposed Secure Architecture

```text

Authorized Data Sources

        |

        v

+----------------------+

|     API Gateway      |

| TLS / Auth / Rate    |

| Limiting / Validation |

+----------+-----------+

           |

           v

+----------------------+

|   Data Processing    |

| Validation /        |

| Sanitization /       |

| Data Minimization    |

+----------+-----------+

           |

           v

+----------------------+

| ML Prediction Engine |

| Fraud Pattern        |

| Detection             |

+----------+-----------+

           |

           v

+----------------------+

|    Risk Engine       |

| Risk Score +         |

| Explainable Factors  |

+----------+-----------+

           |

           v

+----------------------+

|    Secure Database   |

| Encryption + Access  |

| Control + Audit      |

+----------+-----------+

           |

     +-----+------+

     |            |

     v            v

GIS Dashboard   Alert System

     |            |

     +-----+------+

           |

           v

Authorized Police / Banks / FIs / I4C

4\. Defense-in-Depth

Security controls are applied in multiple layers:

Layer 1 – Network Security

HTTPS/TLS for communication

Firewall and network segmentation

Restricted access to internal services

API gateway protection

Layer 2 – Application Security

Authentication

Role-Based Access Control (RBAC)

Input validation

Secure error handling

Rate limiting

Session security

Layer 3 – Data Security

Encryption at rest

Encryption in transit

Data masking

Data minimization

Controlled retention

Layer 4 – Monitoring

Security logs

Audit logs

Suspicious activity monitoring

Alert generation

Layer 5 – Evidence Integrity

SHA-256 cryptographic hashes

Digital signatures where required

Append-only audit records

Original evidence must not be overwritten

5\. Authentication and Authorization

The system should use strong authentication for all authorized users.

Recommended production approach:

OAuth 2.0 / OpenID Connect

Multi-Factor Authentication (MFA)

Short-lived access tokens

Secure refresh-token handling

Strong password policies where passwords are used

Role-Based Access Control


| Role | Main Permissions | Restricted From |
|---|---|---|
| System Administrator | Manage users, roles, system configuration and security settings | Cannot view unnecessary investigation data |
| Police Investigator | View assigned cases, alerts, risk scores and relevant investigation data | Cannot manage system-wide users or security settings |
| Bank/FI Analyst | View authorized financial alerts and relevant transaction information | Cannot access unrelated police investigations |
| I4C/Central Analyst | Access authorized cross-source intelligence and aggregated risk information | Cannot access data outside assigned authorization |
| Auditor | View audit logs, security events and compliance records | Cannot modify operational data or audit records |

6\. Encryption

Data in Transit

All communication between services should use HTTPS with modern TLS.

Examples:

Browser → API Gateway

API Gateway → Backend

Backend → Database

Agency-to-agency communication

Data at Rest

Sensitive information should be encrypted at rest using strong encryption such as AES-256.

Sensitive fields may include:

Account information

Personally identifiable information

Transaction information

Investigation information

Digital evidence

Encryption keys must be stored separately from application data using a secure key-management mechanism.

7\. Secure API Architecture

The API Gateway should provide:

Authentication verification

Authorization checks

Input validation

Rate limiting

Request size limits

API versioning

Logging

Secure error responses

Protection against common web attacks

The API must never trust data received directly from a client.

All important authorization checks must also be performed on the server side.

8\. Audit Logging

Important system activities must be recorded.

An audit event should contain information such as:

Timestamp

User or service identity

User role

Action performed

Resource accessed

Result

Request/correlation ID

Source information where appropriate

Examples of auditable actions:

Login

Failed login

Viewing a sensitive record

Updating a case

Changing user permissions

Creating an alert

Dispatching an intervention

Exporting information

Accessing digital evidence

Audit logs should be protected from unauthorized modification or deletion.

9\. Evidence Integrity

Digital evidence must remain verifiable.

When evidence is collected or imported:

Generate a SHA-256 cryptographic hash.

Store the hash with the evidence metadata.

Preserve the original evidence.

Recalculate the hash whenever integrity needs to be verified.

Compare the calculated hash with the stored hash.

If the hashes match, the evidence has not changed since the recorded hash was generated.

The system should never overwrite original evidence.

10\. Privacy and Data Masking

The system should follow data minimization and least-privilege principles.

Only information required for an investigation should be displayed.

Examples:

Instead of displaying:

Account Number: 1234567890123456

Display:

Account Number: \*\*\*\*\*\*\*\*\*\*\*\*3456

Similarly, unnecessary personal information should be hidden from users who do not require it.

Production systems should also define appropriate data retention and deletion policies.

11\. Secure Agency Communication

Communication between the platform and authorized organizations should be authenticated and encrypted.

Recommended controls:

TLS

Strong service authentication

OAuth 2.0 where applicable

Mutual TLS (mTLS) for high-trust service-to-service communication

Signed messages where integrity/non-repudiation requirements justify them

Correlation IDs for tracking requests

Complete audit logging

Only authorized organizations and services should be able to consume protected intelligence.

12\. Blockchain Decision

Blockchain is NOT required for storing sensitive financial or personal information.

Sensitive information such as:

Account numbers

Personal information

Transaction details

Raw evidence

should NOT be stored directly on a public blockchain.

If blockchain is used, it should be considered for a permissioned, tamper-evident audit mechanism.

A safer design is:

Sensitive Evidence

       |

       v

Encrypted Secure Storage

       |

       +---- SHA-256 Hash ----+

                              |

                              v

                    Tamper-Evident Ledger

The ledger stores proof of integrity rather than the sensitive data itself.

For the prototype, a secure append-only audit log with cryptographic hashes may be sufficient. A permissioned blockchain can be considered as a future enhancement if multiple organizations require shared verification.

13\. Threat Model

Threat: Stolen User Credentials

Controls:

MFA

Short-lived tokens

RBAC

Login monitoring

Threat: Unauthorized Data Access

Controls:

Least privilege

RBAC

Encryption

Server-side authorization

Threat: API Abuse

Controls:

Authentication

Rate limiting

Input validation

API gateway

Threat: Insider Misuse

Controls:

Least privilege

Audit logs

Data masking

Access monitoring

Threat: Database Compromise

Controls:

Encryption at rest

Network isolation

Strong database authentication

Minimal database permissions

Threat: Evidence Tampering

Controls:

SHA-256 hashes

Immutable/or append-only audit records

Digital signatures where required

Original evidence preservation

Threat: Malicious Input

Controls:

Input validation

Sanitization

Schema validation

Secure API design

Threat: Service Disruption

Controls:

Rate limiting

Monitoring

Backups

Fault isolation

Recovery procedures

Threat: Compromised External Integration

Controls:

Strong service authentication

TLS/mTLS

API authorization

Message integrity checks

Audit logging

14\. Zero Trust Principle

The architecture follows a Zero Trust approach:

Never automatically trust a user, device or service just because it is inside the network.

Every request should be evaluated using:

Identity

Role

Permission

Resource

Context

Security policy

Access should be granted only when required.

15\. Prototype vs Production Security

Prototype

The SIH prototype can demonstrate:

Login and RBAC

Masked sensitive fields

HTTPS-ready API architecture

Secure API validation

Audit log design

SHA-256 evidence hashing

Risk-based access

Tamper-evident audit concept

Production

A production deployment should additionally include:

Enterprise identity provider

MFA

Centralized secrets/key management

Network segmentation

WAF/API security

SIEM integration

Continuous monitoring

Security testing

Vulnerability management

Backup and disaster recovery

Formal retention policies

Incident response procedures

16\. Security Principles

The system follows these principles:

Least Privilege

Defense in Depth

Zero Trust

Secure by Design

Privacy by Design

Encryption by Default

Auditability

Evidence Integrity

Data Minimization

Fail Securely

17\. Security Value of the Proposed System

The security architecture ensures that predictive fraud intelligence is not only generated, but also securely accessed, communicated, monitored and verified.

The system combines:

Prediction + Risk Scoring + GIS Intelligence + Secure Access + Auditability + Evidence Integrity

This helps authorized agencies act proactively while reducing the risk of unauthorized access, data leakage and evidence manipulation.

```

