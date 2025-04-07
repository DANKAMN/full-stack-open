```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Server

    User->>Browser: Type note
    User->>Browser: Click Save
    Browser->>Server: POST /new_note
    Server->>Server: Save note
    Server->>Browser: Response
    Browser->>Server: Reload notes page (GET request)
    Server->>Browser: Send updated notes
    Browser->>User: Display updated page
