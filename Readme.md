# Challenge - Desk Booking System



## Beschreibung der WebApp

### Allgemeine Beschreibung

Die **Desk Booking App** ist eine Plattform bei der angemeldete User sich Arbeitsplätze mieten können. Dabei sind folgenede zwei Möglichkeiten vorhanden :

- Variante A => **FixDesk**: Ein User kann sich über einen längeren Zeitraum einen Arbeitsplatz mieten. Diese Variante erfordert eine Zustimmung von Seiten der Plattform(über den Administrator).

- Variante B => **FlexDesk**: Ein User kann sich für maximal 3 Tage am Stück einen Arbeitsplatz mieten. Diese Variante erfordert keine Zustimmung des Administrators


### der Seitenaufbau

#### Allgemeine Landing Page

Hier hat ein bestehender User oder Admin die Möglichkeit sich einzuloggen und ein potentiell neuer User die Option sich zu registrieren. Hat sich ein angemelder User/Admin bei seiner letzten Session nicht abgemeldet, wird diese Landing Page nicht angezeigt sondern stattdessen die **User Landing Page**, oder die **Admin Landing Page** geöffnet.

Für das **Login** wird folgendes benötigt :

- Email
- Password


Eine **Registrierung** muss diese Angaben beinhalten :

- Vorname
- Nachname
- Email
- Department
- Password



#### User Zone

Die Bereiche auf die ein angemeldeter User Zugriff besitzt gliedert sich in :

- User Landing Page
- Reservierungen
- Favoriten
- Buchungsplan
- Profil

Alle diese Bereiche teilen sich die gleiche Navigation, in welcher der aktuelle Pfad des Users mit einer besonderen Markierung versehen wird.


##### User Landing Page

Auf der User Landing Page wird der spezielle Benutzer begrüßt und findet seine nächsten Reservierungen, limitiert auf maximal drei Stück. Will er Einblick in alle seine Reservierungen,  muss er dazu auf die Sub Seite Reservierungen gehen. 

Hat ein User noch keine Reservierungen wird ihm ein kurzer Text diesbezüglich angezeigt, so wie ein Button mit welchem er direkt zur Booking Area gelangt.


##### Reservierungen

Hier erhält ein User eine Übersicht über seine aktuellen, so wie auch seiner veralterten Reservierungen. 

Bei den aktuellen Reservierungen besteht die Möglichkeit das ein Benutzer die Anfragen auf **FixDesk** Arbeitsplätze cancelt, so wie seine **FlexDesk** Reservierungen storniert.

Bei Reservierungen die bereits abgelaufen sind besteht die Möglichkeit die einzelnen Arbeitsplätze mit einem Kommentar zu versehen, sollte ein Arbeitsplatz Mängel in irgendeiner Form aufgewiesen haben. Hier kann ein User Arbeitsplätze auch zu seinen Favoriten hinzufügen um später schneller zu diesen Plätzen zu gelangen.


##### Favoriten

Auf dieser Unterseite werden alle Tische aufgelistet die der Benutzer als Favorit markiert hat. Hier hat er die Möglichkeit seine Lieblings Tische schnell und unkompliziert erneut zu buchen. 

Um diesen Vorgang zu erleichtern gibt es eine Filter Funktion die nach Flex- und FixDesk Wunsch sortiert, so wie auch nach einem gewünschten Zeitraum in welchem er den Arbeitsplatz benötigt. Werden diese Filter angewendet, werden dem Benutzer nur die freien Tische angezeigt die seinen Suchkriterien entsprechen.

Es besteht des Weiteren die Möglichkeit Arbeitsplätze auch wieder aus den Favoriten zu entfernen.


##### Buchungsplan

Dieser Bereich ist das eigentliche Herzstück der Web App. Der User kann hier nach einen Arbeitsplatz suchen der seinen Anforderungen entspricht.

Der **Buchungsplan** gliedert sich in folgende Bausteine, welche auch in der wiedergegebenen Reihenfolge durchlaufen werden:

- eine Abfrage ob ein **FixDesk**, also ein Arbeitsplatz für eine längere Zeit benötigt wird, oder ob der User an einen **FlexDesk** interessiert ist, an diesem er nicht länger als drei Tage am Stück arbeiten kann

- sucht der Benutzer nach einen **FlexDesk** Arbeitsplatz, erscheinen zwei Inputfelder des Types Datum, wo er den Beginn, so auch das Ende seiner Reservierung angeben kann (und auch muß).

- sucht der User nach einen **FixDesk** Tisch, ist das Inputfeld für das Enddatum deaktiviert, da diese Tischoption eine unbefristete Benutzung inkludiert

- sind alle Anforderungen eingegeben, wird eine Liste aller verfügbaren Arbeitsplätze angezeigt die den Suchkriterien entsprechen

Detailinformationen zu diesen Tischen sind anfangs noch eingeklappt um dem User eine bessere generelle Raumübersicht zu gewähren. Ist Interesse an einen bestimmten Raum vorhanden, lässt sich mittels eines Icons die Detailansicht des Raumes öffnen.

In dieser Detailinformationen wird dann eine Raumübersicht, so wie Informationen zu dem Equipment der einzelnen Arbeitspläze angezeigt. Optional kann man sich auch User Kommentare zu dem jeweiligen Platz anzeigen lassen und bei Interesse diesen buchen.


##### Profil

Auf dem Profilpfad kann ein User sich ausloggen so wie seine persönlichen Daten und sein Password ändern.



#### Admin Zone

Wird beim Login ein Administrator identifiziert erhält er Zugriff auf folgende Bereiche :

- Admin Landing Page
- Kommentare
- FlexDesk Anfragen
- User Liste

Auf jeder dieser Unterseiten findet der Admin in der Navigation der App eine Select Box, durch welche er ganz leicht zu den einzelnen Administrator Bereichen gelangen kann.


##### Admin Landing Page

Auf dieser Seite erhält ein Administrator einen schnellen Überblick über neue Kommentare und ungesehene FlexDesk Anfragen. Er kann über Buttons auf alle Bereiche gelangen auf die er Zugriff besitzt (Kommentare, FlexDesk Anfragen, User Liste)


##### Kommentare

Hier sind alle Kommentare der User aufgelistet. 

Besucht ein Admin diese Seite, wird die aktuelle Anzahl an Kommentaren Lokal gespeichert um einen Admin eine schnelle Übersicht über neue Kommentare zu gewährleisten.


##### FlexDesk Anfragen

In diesem Bereich werden alle FlexDesk Anfragen angezeigt. Der Admin kann die einzelnen Anfragen akzeptieren oder verweigern. 


##### User Liste

Alle registrierten Benutzer der Plattform werden angezeigt. Es besteht hier die Möglichkeit das ein Administrator einem User Administratoren Rechte verleiht. 

Auch hier wird ein Eintrag in das Local Storage gemacht, damit ein Admin eine schnelle Orientierung über neue User bekommt.



## Die App starten

- git clone git@gitlab.tailored-apps.com:coding-school/ss2022/webdevelopment/challenge-3-ahs.git
- npm i ausführen um alle Dependencies zu installieren
- npm run start ausführen um das Projekt zu starten


## API Endpunkte


### base

#### /register

Request :

- post request
- body => email, firstname, lastname, department, password


Response bei erfolgreichem Request :

- Statuscode 204
- kein Body


#### /login

Request :

- post request
- body => email, password


Response bei erfolgreichem Request :

- id
- token



### user


#### /user (get)

Hier bekommt man eine Liste aller registrierten User.


Request :

- get
- headers => Authorization => Bearer Token


Response bei erfolgreichem Request :

- ein JSON Array mit User Objekten
- ein User Objekt besteht aus :
    - id - string
    - email - string
    - firstname - string
    - lastname - string
    - department - string
    - isAdmin - boolean


#### /user (post)

Hier kann ein User seine Daten ändern.

Request :

- post
- headers => Authorization => Bearer Token
- body => die Keys die man updaten will mit neuen Values


Response bei erfolgreichem Request :

- JSON User Objekt mit alle seinen Eigenschaften (siehe oben /user (get) ) => die dazugehörigen Werte entsprechen dem aktuellen Status


Fehler im Request :

- Password muss mindestens 5 Zeichen lang sein


#### /user/{userId}

Hier kann man sich das Profil eines Speziellen Users, über seine ID, anzeigen lassen.

Request :

- get
- headers => Authorization => Bearer Token
- User ID im Pfad


Response bei erfolgreichem Request :

- JSON User Objekt



### office

#### /office

Hier erhält man eine Übersicht über alle Offices.

Request :

- get
- headers => Authorization => Bearer Token


Response bei erfolgreichem Request :

- ein JSON Array aus Office Objekten
- ein Objekt besteht aus :
    - id - string
    - name - string
    - map - string(url)


#### /office/{id}

Hier greift man mit Hilfe der Id auf ein spezielles office zu.

Request :

- get
- headers => Authorization => Bearer Token
- id in der URL


Response bei erfolgreichem Request :

- ein JSON Office Objekt (Keys => id, name, map)



### desk

#### /desk

Bei diesem Endpunkt erhält man eine Liste aller Arbeitsplätze.

Request :

- get
- headers => Authorization => Bearer Token


Response bei erfolgreichem Request :

- ein JSON Array mit Desk Objekten
- Aufbau eines Desk Objekts :
````json
{
        "id": "string",
        "label": "string",
        "office": {
            "id": "string",
            "name": "string",
            "map": "string(url)"
        },
        "fixDeskUserId": "string",
        "map": "string(url)",
        "equipment": [
            "string",
            "string"
        ]
    }
````
Anmerkung: Bei flexDesk`s gibt es keine Id


#### /desk/{deskId}

Hier erhält man über die Id einen speziellen Arbeitsplatz.

Request :

- get
- headers => Authorization => Bearer Token
- Id in der URL


Response bei erfolgreichem Request :

- ein JSON Desk Objekt (siehe /desk)


#### comment area

##### /desk/{deskId}/comment (get)

Hier erhält man eine Liste aller Kommentare für den entsprechen Tisch.

Request :

- get
- headers => Authorization => Bearer Token
- Id des Tisches in der URL


Response bei erfolgreichem Request :

- ein JSON Array mit Kommentar Objekten
- Aufbau eines Kommentar Objekts :
````json
 {
        "id": "string",
        "desk": {
            "id": "string",
            "label": "string",
            "office": {
                "id": "string",
                "name": "string",
                "map": "string(url)"
            },
            "fixDeskUserId": "string",
            "map": "string(url)",
            "equipment": [
                "string",
                "string"
            ]
        },
        "user": {
            "id": "string",
            "email": "string",
            "firstname": "string",
            "lastname": "string",
            "department": "string",
            "isAdmin": boolean,
        },
        "commentedAt": "string(date)",
        "comment": ""
    }
````

##### /desk/{deskId}/comment (post)

Auf diesen Endpunkt kann man ein neues Kommentar posten.

Request:

- post
- headers => Authorization => Bearer Token
- Id des Tisches in der URL
- body => "comment": "message"


Response bei erfolgreichem Request :

- Status 204 
- kein Body


##### /desk/{deskId}/comment/{commentId}

Zugriff auf ein spezielles Kommentar mit Hilfe der Id.

Request :

- get
- headers => Authorization => Bearer Token
- Id des Tisches in der URL
- Id des Kommentars in der URL


Response bei erfolgreichem Request :

- JSON Kommentar Objekt (siehe /desk/{deskId}/comment )


#### fix desk area

##### /desk/{deskId}/fix (post)

Hier kann man eine fix desk Anfrage senden.

Request :

- post
- headers => Authorization => Bearer Token
- Id des Platzes in der URL
- body => "comment": "message"


Response bei erfolgreichem Request :

- Statuscode 204
- kein Body


##### /desk/{deskId}/fix (get)

Auf diesem Endpunkt kann man den aktuellen Status der fix desk Anfrage abfragen.

Request :

- get
- headers => Authorization => Bearer Token
- Id des Arbeitsplatzes in der URL


Response bei erfolgreichem Request :

- ein JSON Status Objekt
- das Status Objekt besteht nur aus einem key value Paar => "status": "current status"


##### /desk/{deskId}/fix (delete)

Eine noch auf Bestätigung wartende fix desk Anfrage kann hier gelöscht werden.

Request :

- delete
- headers => Authorization => Bearer Token
- Id des Tisches in der URL


Response bei erfolgreichem Request :

- Statuscode 204
- kein Body



### favourite

#### /favourite (post)

Hier kann man einen Platz zu seinen Favoriten hinzufügen.

Request :

- post
- headers => Authorization => Bearer Token
- body => "deskId": "id eines Tisches" => Anmerkung: bei einem Desk Objekt lautet der entsprechende Key nicht deskId sonder nur Id


Response bei erfolgreichem Request :

- Statuscode 204
- kein Body


#### /favourite (get)

Hier erhält ein User seine gesamten Favoriten.

Request :

- get 
- headers => Authorization => Bearer Token


Response bei erfolgreichem Request :

- ein JSON Desk Objekt (der Aufbau eines Desk Objekts siehe oben /desk)


#### /favourite (delete)

Mit diesem Endpunkt kann ein Arbeitsplatz aus der Favoriten Liste entfernt werden.

Request:

- delete
- headers => Authorization => Bearer Token
- body => "deskId": "id des Tisches" => Anmerkung: bei einem Desk Objekt lautet der entsprechende Key nicht deskId sonder nur Id


Response bei erfolgreichem Request :

- Statuscode 204 
- kein Body



### booking

#### /booking (post)

Hier kann ein User einen Flex Desk buchen.

Request :

- post
- headers => Authorization => Bearer Token
- body => 
    - "deskId": "id des Tisches" 
    - "dateStart": "JJ-MM-DD" 
    - "dateEnd": "JJ-MM-DD"


Response bei erfolgreichem Request :

- Statuscode 204
- kein Body


#### /booking (get) => alle Buchungen

Durch diesen Endpunkt erhält man eine Liste aller Buchungen, Flex Desks und Fix Desks.

Request :

- get
- headers => Authorization => Bearer Token


Response bei erfolgreichem Request :

- ein JSON Array mit Buchungsobjekten
- der Aufbau eines Buchungsobjektes :
````json
{
        "id": "string",
        "desk": {
            "id": "string",
            "label": "string",
            "office": {
                "id": "string",
                "name": "string",
                "map": "string(url)"
            },
            "fixDeskUserId": "string",
            "map": "string(url),
            "equipment": [
                "string",
                "string"
            ]
        },
        "dateStart": "string(date)",
        "dateEnd": "string(date)",
        "bookedAt": "string(date)",
        "user": {
            "id": "string",
            "email": "string",
            "firstname": "string",
            "lastname": "string",
            "department": "string",
            "isAdmin": boolean
        }
    }
````

#### /booking (get) => alle Buchungen eines Tisches

Request :

- get
- headers => Authorization => Bearer Token
- zusätzliche Parameter in der URL => ?deskId=theDeskId


Response bei erfolgreichem Request :

- ein JSON Array mit Buchungsobjekten (der Aufbau eines Buchungsobjektes siehe oben => /booking alle Buchungen)


#### /booking (get) => alle Buchungen eines Users

Request:

- get
- headers => Authorization => Bearer Token
- zusätzliche Parameter in der URL => ?userId=theUserId


#### /booking/{bookingId} (get)

Hier bekommt man Detailinformationen zu einer speziellen Buchung.

Request:

- get
- headers => Authorization => Bearer Token
- die Id einer Buchung in der URL


Response bei erfolgreichem Request :

- ein JSON Buchungsobjekt (der Aufbei eines Buchungsobjektes siehe oben => /booking alle Buchungen)


#### /booking/{bookingId} (delete)

Dieser Endpunkt ermöglicht es eine Flex Desk Buchung, bis zu den Tag vor der Reservierung, zu stornieren.

Request :

- delete
- headers => Authorization => Bearer Token
- die Id einer Buchung in der URL


Response bei erfolgreichem Request:

- Statuscode 204
- kein Body

Anmerkung : dieser Vorgang wird nur erlaubt wenn man auch der tatsächliche User dieser Reservierung ist.



### admin

#### /admin/fix-desk-request

Hier erhält der Administrator eine Liste aller Fix Desk Anfragen.

Request:

- get
- headers => Authorization => Bearer Token


Response bei erfolgreichem Request :

- ein JSON Array aus Fix Desk Anfrage Objekten
- der Aufbau eines Fix Desk Anfrage Objektes :
````json
{
        "id": "string",
        "user": {
            "id": "string",
            "email": "string",
            "firstname": "string",
            "lastname": "string",
            "department": "string",
            "isAdmin": boolean
        },
        "requestedAt": "string(date)",
        "desk": {
            "id": "string",
            "label": "string",
            "office": {
                "id": "string,
                "name": "string",
                "map": "string(url)"
            },
            "map": "string(url)",
            "equipment": [
                "string",
                "string"
            ]
        },
        "comment": "string"
    }
````

#### /admin/fix-desk-request/{requestId}

Ein spezieller Fix Desk Request wird mit Hilfe seiner Id angezeigt.

Request :

- get
- headers => Authorization => Bearer Token
- die Id eines Requests in der URL


Response bei erfolgreichem Request:

- ein JSON Fix Desk Request Objekt(der Aufbau eine Fix Desk Request Objektes siehe oben /admin/fix-desk-request)


#### /admin/fix-desk-request/{requestId}/approve

Ein Fix Desk Request wird genehmigt.

Request :

- post
- headers => Authorization => Bearer Token
- die Id eines Requests in der URL
- body => wird keiner benötigt


Response bei erfolgreichem Request :

- Statuscode 204
- kein Body


#### /admin/fix-desk-request/{requestId}/decline

Ein Fix Desk Request wird abgelehnt.

Request :

- post
- headers => Authorization => Bearer Token
- die Id eines Requests in der URL


Response bei erfolgreichem Request :

- Statuscode 204
- kein Body


#### /admin/comments

Hier erhält der Administrator eine Liste aller Kommentare.

Request :

- get
- headers => Authorization => Bearer Token


Response bei erfolgreichem Request :

- ein JSON Array aus Kommentar Objekten (der Aufbau eines Kommentar Objekts siehe oben /desk/{deskId}/comment (get))


#### /admin/user/{userId}/admin

Bei diesem Pfad kann der Administrator einen User Administratoren Rechte verleihen.

Request :

- post
- headers => Authorization => Bearer Token
- secret key als URL Parameter => ?secret=theSecret


Response bei erfolgreichem Request :

- Statuscode 204
- kein Body



## Entwickler Kodex

### verwendete Technologien

- React
- Java Script
- Sass
- Fetch Api
- React Router
- React Loader Spinner


### Verhalten

- es werden keine Codezeilen verändert die alle benutzen ohne dies vorher mit allen zu besprechen
- die Texte der App sind auf Deutsch geschrieben 
- die Filenamen des gesamten Projekts sind in englischer Sprache