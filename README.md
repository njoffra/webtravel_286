Mini webtravel backend aplikacija napravljena sa node.js i MongoDB bazom podataka.
Baza je spremljena online. Aplikacija ima većinu ispunjenih zahtjeva koji su navedeni u opisu zadataka.
U repou imaju screenovi baze podataka i kolekcija koje dolaze. Kroz app.js na startup aplikacije
kreiram ove kolekcije i insretam odmah admin-a u bazu podataka. Frontend nije dobio toliko pažnje kao i backend
pa je većina funkcionalnosti testirano pomoću postman-a. Mogu screenshot testiranje ako je potrebno. Imao sam problem
kod prikazivanja ime kategorije u Indexu. Jer kad fetch-am travel fetcha mi samo Id od kategorije. Onda ja pokušam fetchat
kategoriju pomoću tog Id. Ali s obzirom da za fetch funkciju potrebno je proslijediti string, a taj Id je oblika 
mongoose.Types.ObjectId njega ne mogu cast u string i ne radi mi to drugo fetchanje. Pokušavao sam fixati problem ali u ovom 
periodu nisam uspio.
