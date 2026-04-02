# Finance Dashboard UI

A React + normal JavaScript + normal CSS project made for a frontend screening assignment.

## Features included

- Dashboard overview with:
  - Total Balance
  - Income
  - Expenses
  - Transaction count
- Time based visualization using a simple SVG line chart
- Categorical visualization using custom horizontal bars
- Transactions section with:
  - search
  - filter
  - sorting
- Basic role based UI:
  - Viewer can only see data
  - Admin can add and delete transactions
- Insights section
- Responsive layout
- Empty state handling
- Local storage persistence
- Dark mode

## Project structure

```bash
src/
  components/
  data/
  App.jsx
  App.css
  index.css
  main.jsx
```

## Run locally

```bash
npm install
npm run dev
```

## Notes about approach

- The project uses simple React state with `useState`, `useMemo`, and `useEffect`
- No backend is used
- Mock data is stored in a separate file
- Code is written in a readable intermediate-level style with comments
- Charts are custom-made with SVG and CSS so the project stays simple

## Assignment requirement mapping

### 1. Dashboard Overview
Included summary cards, one time based chart, and one category based chart.

### 2. Transactions Section
Included date, amount, category, type, search, filter, and sorting.

### 3. Basic Role Based UI
Included role switcher between viewer and admin. Admin can add/delete.

### 4. Insights Section
Included highest spending category, monthly comparison, and useful observation.

### 5. State Management
Handled transactions, filters, role, and theme with React state.

### 6. UI and UX
Responsive and readable layout with empty state messages.

## Improvement ideas

- Edit transaction feature
- Export CSV/JSON
- Better advanced charts
- More insights
- Backend API integration
