# TravelMate

**TravelMate** to full-stackowa aplikacja do planowania podróży, łącząca Vue.js na frontendzie z Django+DRF na backendzie. Umożliwia:

* Rejestrację i logowanie (JWT + odświeżanie tokenów)
* CRUD tras (`Trip`) z datami rozpoczęcia i zakończenia
* Przypisywanie i odczyt tras chronionych autoryzacją
* Dashboard z podsumowaniami oraz listą wyjazdów
* Obsługę CORS, PWA i Docker (opcjonalnie)

---

## 🌐 Technologie

* **Frontend**: Vue 3 + Vite + Vue Router + Pinia + Axios + Tailwind CSS
* **Backend**: Django 4 + Django REST Framework + SimpleJWT + Celery (dla przypomnień)
* **Baza danych**: PostgreSQL (domyślnie SQLite w dev)
* **Inne**: Docker, GitHub Actions, Sentry, Leaflet, Chart.js

---

## 🔧 Wymagania

* Python 3.11+
* Node.js 18+
* Docker (opcjonalnie)

---

## 🚀 Szybki start

### Backend

```bash
cd backend
python3 -m venv venv
autoactivate
pip install -r requirements.txt
cp .env.example .env   # lub utwórz .env z SECRET_KEY
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

**Domyślnie** API dostępne pod `http://127.0.0.1:8000/`.

### Frontend

```bash
cd frontend
cp .env.example .env  # ustaw VITE_API_URL=http://127.0.0.1:8000
en npm install
npm run dev
```

Frontend startuje na `http://localhost:5173/`.

---

## 📐 Konfiguracja środowiska

### Backend `.env`

```
SECRET_KEY=<twój_secret_key>
DEBUG=True
```

### Frontend `.env`

```
VITE_API_URL=http://127.0.0.1:8000
```

---

## 🔌 Endpoints API

* `POST /api/auth/register/` – rejestracja użytkownika
* `POST /api/auth/login/` – logowanie JWT
* `POST /api/auth/token/refresh/` – odświeżanie access token
* `POST /api/auth/logout/` – wylogowanie (blacklist)
* `GET, POST /api/trips/` – lista i tworzenie tras
* `GET, PUT, PATCH, DELETE /api/trips/{id}/` – operacje na trasie

---

## 📂 Struktura projektu

```
TravelMate/
├─ backend/           # Django + DRF + SimpleJWT
│  ├─ config/         # settings, urls, etc.
│  ├─ accounts/       # auth (register, login, logout)
│  └─ trips/          # API CRUD Trip
└─ frontend/          # Vue 3 + Vite + Tailwind
   ├─ src/
   │  ├─ views/       # widoki (Home, Login, Register, Dashboard)
   │  ├─ router/      # konfiguracja tras
   │  └─ components/  # helpery, utils
```

---

## 📝 Dalsze kroki

* Dodanie integracji z zewnętrznym API lotów (Skyscanner) i pogodowym (OpenWeather)
* Rozbudowa dashboardu: wykresy Chart.js, mapa Leaflet, heatmap
* Obsługa offline PWA i powiadomień push
* Docker Compose + CI/CD na GitHub Actions

---

## 🤝 Współpraca

Jestem otwarty na współpracę! Jeśli masz pomysły, sugestie lub chcesz pomagać, daj znać – zgłaszaj kwestie na Issues lub pisz bezpośrednio.

---

© 2025 TravelMate
