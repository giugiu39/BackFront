# 📝 PROMEMORIA PROSSIMA SESSIONE

## 🎯 Obiettivi Principali

### 1. Dashboard Admin
- Ripartire dalla dashboard dell'admin
- Verificare funzionalità esistenti
- Implementare eventuali miglioramenti necessari

### 2. Gestione Wishlist Customer
- Implementare sistema di wishlist per i clienti
- Creare interfaccia per aggiungere/rimuovere prodotti dalla wishlist
- Gestire persistenza dei dati wishlist

### 3. Audit Database Entities
- Controllare tutte le entità del database presenti
- Identificare entità non utilizzate concretamente nell'applicazione
- Valutare eliminazione di entità superflue per ottimizzare il database
- Documentare entità effettivamente necessarie

## 📊 Stato Attuale del Progetto

### ✅ Completato
- Risolto problema aggiunta prodotti con FormData
- Rimosso bottone "Categories" dalla dashboard admin
- Sistema di autenticazione Keycloak funzionante
- Backend Spring Boot operativo (porta 8081)
- Frontend React operativo (porta 5173)

### 🔧 Servizi Attivi
- **Backend**: `http://localhost:8081`
- **Frontend**: `http://localhost:5173`
- **Keycloak**: `http://localhost:8090`
- **Admin Dashboard**: `http://localhost:5173/admin`

### 📁 Struttura Progetto
```
BackFront/
├── Back/     # Spring Boot Backend
└── Front/    # React Frontend
```

## 🚀 Prossimi Passi Suggeriti

1. **Analisi Database**: Esaminare tutte le entità JPA nel backend
2. **Wishlist Implementation**: Creare modello, controller e interfaccia
3. **Dashboard Review**: Verificare completezza funzionalità admin
4. **Database Cleanup**: Rimuovere entità non utilizzate

---
*Ultimo aggiornamento: Sessione corrente*
*Commit: "Alcuni ritocchi" - Rimozione riferimenti Categories*