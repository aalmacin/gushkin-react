# Product Requirements Document (PRD)
## Gushkin - Town-Building Habit Tracker

**Version:** 2.0
**Last Updated:** November 4, 2025
**Product Owner:** [Your Name]
**Status:** Active Development

---

## 1. Executive Summary

Gushkin is a revolutionary gamified habit tracking application that combines real-life productivity with town-building simulation. Users set **weekly time-based goals** (e.g., "Exercise for 10 hours", "Play Guitar for 10 hours"), earn **gold** by completing them, and use that gold to build and manage a virtual town with buildings, businesses, and people that generate **passive income** - creating a self-sustaining motivation loop inspired by Habitica, Farmville, and SimCity.

---

## 2. Product Vision

**Mission Statement:**
Transform personal development into an engaging town-building game where every hour of real-world productivity contributes to growing a thriving virtual community.

**Core Value Proposition:**
- **For individuals** who struggle with maintaining weekly productivity goals
- **Gushkin** is a habit tracking game
- **That** lets you build and manage a virtual town that grows with your real-life accomplishments
- **Unlike** Habitica or standard habit trackers
- **Our product** combines time-based goal tracking with idle game mechanics where your town generates passive income, creating sustainable motivation

**Unique Selling Points:**
1. **Weekly time-based goals** instead of simple daily checkboxes
2. **Town-building simulation** as the reward system
3. **Passive income generation** from buildings/businesses (idle game mechanics)
4. **Visual progress** - watch your town grow as you improve yourself

---

## 3. User Personas

### Primary Persona: "The Productive Builder"
- **Age:** 25-40
- **Goals:** Achieve weekly productivity targets, build better routines, see tangible results
- **Pain Points:**
  - Needs long-term motivation (not just daily checkmarks)
  - Wants to see accumulated progress visually
  - Enjoys simulation/building games but feels guilty playing them
- **Tech Savviness:** Moderate to High
- **Behavior:** Plays idle/simulation games, tracks time spent on activities, goal-oriented

### Secondary Persona: "The Gamified Self-Improver"
- **Age:** 18-35
- **Goals:** Make habit-building fun, earn rewards for real-life actions
- **Pain Points:**
  - Traditional habit trackers are boring
  - Needs gamification to stay motivated
  - Wants rewards that feel meaningful
- **Tech Savviness:** Moderate
- **Behavior:** Enjoys mobile games, responds to visual rewards, likes passive progression

---

## 4. Core Game Loop

```
Set Weekly Goals → Complete Real-Life Tasks → Log Time → Earn Gold
       ↑                                                       ↓
Town Generates Income ← Assign Citizens ← Build/Upgrade Town
```

**The Hook:** Your real-life productivity directly fuels a town that continues generating income even when you're not playing, creating a compounding reward system.

---

## 5. Core Features

### 5.1 Weekly Time-Based Goals System

**Description:**
Users create weekly goals with time commitments (e.g., "Exercise: 10 hours/week", "Read: 8 hours/week", "Guitar Practice: 5 hours/week"). Throughout the week, users log time spent on these activities.

**User Stories:**
- As a user, I want to set weekly time-based goals so I can commit to meaningful weekly targets
- As a user, I want to log time spent on activities throughout the week so I can track progress
- As a user, I want to see my weekly progress as a percentage/progress bar so I know if I'm on track
- As a user, I want to earn gold based on time logged so I can build my town

**Acceptance Criteria:**
- Users can create weekly goals with:
  - Goal name (e.g., "Exercise", "Reading", "Guitar Practice")
  - Weekly time target (in hours, e.g., 10 hours)
  - Gold reward per hour completed (e.g., 10 gold/hour)
  - Category/icon for visual organization
- Users can log time entries:
  - Select goal from list
  - Enter duration (hours:minutes)
  - Add optional notes
  - Timestamp automatically recorded
- Dashboard shows:
  - Current week's goals with progress bars
  - Time logged vs. target (e.g., "7.5 / 10 hours")
  - Percentage complete
  - Gold earned this week
- Weekly reset on Monday at 12:00 AM
- Bonus gold awarded for 100% goal completion

**Technical Implementation:**
```typescript
WeeklyGoal {
  id: ID!
  userId: ID!
  name: String!  // "Exercise", "Guitar Practice"
  weeklyTargetHours: Float!  // 10.0
  goldPerHour: Float!  // 10
  category: GoalCategory!  // HEALTH, SKILL, EDUCATION, etc.
  iconName: String!
  active: Boolean!
  createdAt: DateTime!
}

TimeEntry {
  id: ID!
  userId: ID!
  goalId: ID!
  durationMinutes: Int!  // 90 minutes
  notes: String
  loggedAt: DateTime!
  weekStartDate: Date!  // For weekly grouping
  goldEarned: Float!  // Calculated: (durationMinutes/60) * goldPerHour
}

WeeklyProgress {
  goal: WeeklyGoal!
  weekStartDate: Date!
  totalMinutesLogged: Int!
  totalGoldEarned: Float!
  percentComplete: Float!
  completed: Boolean!
}
```

**UI Components:**
- `WeeklyGoalsList.tsx` - Display all active weekly goals with progress
- `AddTimeEntry.tsx` - Quick time logging form
- `WeeklyDashboard.tsx` - Overview of all goals for current week
- `GoalProgressBar.tsx` - Visual progress indicator
- `TimeEntryHistory.tsx` - View all logged time entries

**GraphQL Operations:**
- Mutations: `createWeeklyGoal`, `logTimeEntry`, `updateWeeklyGoal`
- Queries: `GET_WEEKLY_GOALS`, `GET_WEEKLY_PROGRESS`, `GET_TIME_ENTRIES`

---

### 5.2 Gold Currency System

**Description:**
Gold is the primary currency earned by logging time on weekly goals. Gold is used to purchase buildings, people, and businesses for the town.

**User Stories:**
- As a user, I want to earn gold by logging time on my goals so I feel rewarded for productivity
- As a user, I want to see my total gold balance prominently displayed
- As a user, I want to earn bonus gold for completing weekly goals at 100%

**Acceptance Criteria:**
- Gold earned formula: `(minutes_logged / 60) * gold_per_hour`
- Bonus gold for 100% weekly goal completion: 50% of total weekly earnings
  - Example: Complete 10-hour goal at 10 gold/hour = 100 base gold + 50 bonus gold = 150 total
- Gold balance displayed as integer with coin icon (e.g., "🪙 1,250")
- Gold updates in real-time after logging time
- Transaction history shows gold earned/spent with timestamps

**Technical Implementation:**
```typescript
GoldTransaction {
  id: ID!
  userId: ID!
  amount: Float!  // Positive for earning, negative for spending
  type: TransactionType!  // TIME_LOG, WEEKLY_BONUS, BUILDING_PURCHASE, etc.
  description: String!
  relatedEntityId: ID  // ID of TimeEntry, Building, etc.
  timestamp: DateTime!
}

User {
  currentGold: Float!  // Calculated from sum of transactions
  lifetimeGoldEarned: Float!
  lifetimeGoldSpent: Float!
}
```

**UI Components:**
- `GoldDisplay.tsx` - Prominent header display of current gold
- `GoldTransactionHistory.tsx` - Scrollable list of all transactions
- `WeeklyBonusNotification.tsx` - Celebration animation when weekly goal completed

---

### 5.3 Town-Building System

**Description:**
The core game mechanic! Users spend gold to build a virtual town with buildings, decorations, and infrastructure. The town serves as a visual representation of accumulated productivity.

**User Stories:**
- As a user, I want to purchase buildings with my earned gold so I can grow my town
- As a user, I want to place buildings on a grid-based map so I can design my town layout
- As a user, I want different building types (houses, shops, factories) with unique appearances
- As a user, I want to see my town grow as I complete more goals so I feel a sense of progression

**Acceptance Criteria:**
- **Building Types:**
  - **Residential:** Houses, Apartments, Mansions (provide citizens)
  - **Commercial:** Shops, Restaurants, Markets (generate income, require citizens)
  - **Industrial:** Factories, Farms, Workshops (generate income, require citizens)
  - **Decorative:** Parks, Fountains, Trees (increase happiness/efficiency)
  - **Infrastructure:** Roads, Bridges, Town Hall (unlock features)

- **Building Properties:**
  - Name and description
  - Purchase cost (in gold)
  - Size (e.g., 2x2, 3x3 grid squares)
  - Build time (optional: buildings take time to construct)
  - Maintenance cost (optional: daily/weekly upkeep)
  - Visual sprite/asset

- **Town Map:**
  - Grid-based layout (e.g., 20x20 expandable grid)
  - Drag-and-drop building placement
  - Collision detection (no overlapping)
  - Zoom in/out, pan around town
  - Isometric or top-down 2D view

- **Progression:**
  - Start with small plot (e.g., 10x10)
  - Expand land by purchasing adjacent plots
  - Unlock advanced buildings by reaching milestones (e.g., "Build 5 houses to unlock Apartments")

**Technical Implementation:**
```typescript
BuildingTemplate {
  id: ID!
  name: String!  // "Small House", "Bakery", "Factory"
  description: String!
  type: BuildingType!  // RESIDENTIAL, COMMERCIAL, INDUSTRIAL, DECORATIVE
  purchaseCost: Float!
  width: Int!  // Grid squares
  height: Int!
  buildTimeMinutes: Int  // Optional construction time
  maintenanceCostPerDay: Float  // Optional
  unlockRequirement: String  // e.g., "5_houses_built"
  spriteUrl: String!
}

PlacedBuilding {
  id: ID!
  userId: ID!
  templateId: ID!
  gridX: Int!  // Position on town grid
  gridY: Int!
  placedAt: DateTime!
  constructionCompleteAt: DateTime
  status: BuildingStatus!  // UNDER_CONSTRUCTION, ACTIVE, PAUSED
}

TownMap {
  userId: ID!
  gridWidth: Int!  // Expandable
  gridHeight: Int!
  buildings: [PlacedBuilding!]!
}

enum BuildingType {
  RESIDENTIAL
  COMMERCIAL
  INDUSTRIAL
  DECORATIVE
  INFRASTRUCTURE
}

enum BuildingStatus {
  UNDER_CONSTRUCTION
  ACTIVE
  PAUSED
}
```

**UI Components:**
- `TownMapView.tsx` - Main town visualization (canvas-based or SVG)
- `BuildingMenu.tsx` - Sidebar showing available buildings to purchase
- `BuildingDetail.tsx` - Modal showing building stats before purchase
- `PlaceBuildingMode.tsx` - Drag-and-drop placement interface
- `TownStats.tsx` - Overview (population, income, happiness)

**GraphQL Operations:**
- Queries: `GET_BUILDING_TEMPLATES`, `GET_TOWN_MAP`, `GET_PLACED_BUILDINGS`
- Mutations: `purchaseBuilding`, `placeBuilding`, `moveBuilding`, `sellBuilding`, `expandLand`

---

### 5.4 Citizens & Population System

**Description:**
Citizens populate residential buildings and work in commercial/industrial buildings. They are the workforce that generates passive income.

**User Stories:**
- As a user, I want residential buildings to provide citizens so I can populate my town
- As a user, I want to assign citizens to businesses so they can generate income
- As a user, I want to see citizen count and employment status clearly

**Acceptance Criteria:**
- Residential buildings generate citizens:
  - Small House: 2 citizens
  - Apartment: 5 citizens
  - Mansion: 10 citizens
- Total population = sum of all residential building capacities
- Employed citizens = citizens assigned to businesses
- Unemployed citizens displayed (Population: 25, Employed: 18, Unemployed: 7)
- Citizens automatically assigned to businesses (or manual assignment option)
- Businesses require citizens to operate:
  - Bakery: 2 citizens
  - Factory: 5 citizens
  - Market: 3 citizens

**Technical Implementation:**
```typescript
BuildingTemplate {
  // ... existing fields
  providesPopulation: Int  // For residential buildings
  requiresWorkers: Int  // For commercial/industrial buildings
}

PlacedBuilding {
  // ... existing fields
  assignedWorkers: Int  // Current workers assigned
}

TownStats {
  totalPopulation: Int!
  employedCitizens: Int!
  unemployedCitizens: Int!
  housingCapacity: Int!
  jobsAvailable: Int!
}
```

**UI Components:**
- `PopulationWidget.tsx` - Display population stats in header
- `WorkerAssignment.tsx` - Manage citizen employment (if manual)
- `BuildingWorkers.tsx` - Show workers in a building

---

### 5.5 Passive Income Generation System (Idle Game Mechanics)

**Description:**
The killer feature! Buildings with assigned citizens generate gold automatically over time, even when the user is offline. This creates passive income that compounds with more buildings, incentivizing continued habit tracking.

**User Stories:**
- As a user, I want my businesses to generate gold automatically so I earn passive income
- As a user, I want to collect accumulated income when I return to the app
- As a user, I want to see income rates per hour/day for each building
- As a user, I want to upgrade buildings to increase income generation

**Acceptance Criteria:**
- **Income Generation:**
  - Each commercial/industrial building generates gold per hour when staffed
  - Example income rates:
    - Bakery (2 workers): 5 gold/hour
    - Factory (5 workers): 15 gold/hour
    - Market (3 workers): 8 gold/hour
  - Buildings without enough workers generate reduced/no income

- **Collection Mechanics:**
  - Income accumulates continuously (up to 48-hour cap)
  - "Collect All" button shows pending income with animation
  - Notification when significant income is ready to collect
  - Visual indicator on buildings with ready income (coin icon)

- **Income Calculation:**
  - `income_per_hour = base_rate * worker_efficiency * happiness_multiplier`
  - Total town income = sum of all active businesses
  - Display: "Town Income: 75 gold/hour" in dashboard

- **Upgrades:**
  - Buildings can be upgraded (Level 1 → Level 2 → Level 3)
  - Each level increases income generation (e.g., +50% per level)
  - Upgrade costs scale (Level 2: 2x original cost, Level 3: 4x)
  - Visual changes for upgraded buildings

**Technical Implementation:**
```typescript
BuildingTemplate {
  // ... existing fields
  baseIncomePerHour: Float  // For commercial/industrial
  maxUpgradeLevel: Int!  // 3
  upgradeCostMultiplier: Float!  // 2.0 (doubles each level)
  incomeIncreasePerLevel: Float!  // 0.5 (50% increase)
}

PlacedBuilding {
  // ... existing fields
  upgradeLevel: Int!  // 1, 2, or 3
  lastIncomeCollectedAt: DateTime!
}

Income {
  calculatePendingIncome(building: PlacedBuilding, now: DateTime): Float
  collectAllIncome(userId: ID!): Float
  getTotalIncomeRate(userId: ID!): Float  // Gold per hour
}
```

**Formulas:**
```
Pending Income = (current_time - last_collected_time) * income_per_hour / 3600
(capped at 48 hours)

Actual Income Per Hour = base_income * (1 + upgrade_level * 0.5) * worker_efficiency * happiness

Worker Efficiency = assigned_workers / required_workers
(e.g., 2/2 = 1.0, 1/2 = 0.5)
```

**UI Components:**
- `CollectIncomeButton.tsx` - Big button showing pending income
- `IncomeNotification.tsx` - Popup when collecting income
- `TownIncomeRate.tsx` - Display total income per hour
- `BuildingIncome.tsx` - Show income rate for individual building
- `UpgradeBuildingModal.tsx` - Upgrade interface with cost/benefit

**GraphQL Operations:**
- Queries: `GET_PENDING_INCOME`, `GET_TOWN_INCOME_RATE`
- Mutations: `collectIncome`, `upgradeBuilding`

---

### 5.6 Happiness & Efficiency System (Optional Polish)

**Description:**
Decorative buildings and good town planning increase citizen happiness, which multiplies income generation.

**User Stories:**
- As a user, I want decorations to improve income so there's strategic value
- As a user, I want to see my town's happiness level

**Acceptance Criteria:**
- Happiness score: 0-100%
- Decorative buildings increase happiness (Park: +5%, Fountain: +10%)
- Overcrowding decreases happiness (too many buildings, no decoration)
- Happiness multiplier for income: `1.0 + (happiness / 200)`
  - 0% happiness = 1.0x income
  - 50% happiness = 1.25x income
  - 100% happiness = 1.5x income

**Technical Implementation:**
```typescript
TownStats {
  // ... existing fields
  happinessScore: Float!  // 0-100
  happinessMultiplier: Float!  // Calculated
}
```

---

### 5.7 Building Store/Marketplace

**Description:**
In-game shop where users browse and purchase buildings, view stats, and plan their town.

**User Stories:**
- As a user, I want to browse available buildings organized by category
- As a user, I want to see building costs, stats, and requirements before purchasing
- As a user, I want to see which buildings I can afford with my current gold
- As a user, I want to see locked buildings and their unlock requirements

**Acceptance Criteria:**
- Buildings organized by tabs: Residential, Commercial, Industrial, Decorative, Infrastructure
- Each building shows:
  - Preview image
  - Name and description
  - Cost (with "Can afford" / "Need X more gold" indicator)
  - Size (grid dimensions)
  - Special stats (population provided, income generated, workers required)
  - Unlock status (Locked/Unlocked with requirement text)
- Filter options: Affordable Only, Unlocked Only, Sort by Cost
- Purchase flow:
  1. Click building → View details modal
  2. Click "Purchase" → Spend gold
  3. Enter placement mode → Click on grid to place
  4. Confirm placement or cancel

**UI Components:**
- `BuildingStore.tsx` - Main marketplace view
- `BuildingCategoryTabs.tsx` - Category navigation
- `BuildingCard.tsx` - Individual building preview card
- `BuildingDetailModal.tsx` - Full building information
- `PurchaseButton.tsx` - Handle purchase with gold check

---

### 5.8 Dashboard & Overview

**Description:**
Central hub showing weekly goals, town stats, and quick actions.

**User Stories:**
- As a user, I want to see my current week's progress at a glance
- As a user, I want to see my town's key metrics (population, income, gold)
- As a user, I want quick access to log time and collect income

**Acceptance Criteria:**
- **Top Section:** Gold balance, pending income, collect button
- **Weekly Goals Section:** All goals with progress bars, quick log time button
- **Town Stats Section:** Population, employed citizens, income rate, happiness
- **Quick Actions:** "Log Time", "View Town", "Building Store", "History"
- **Notifications:** Weekly bonus earned, goals completed, new buildings unlocked

**UI Components:**
- `Dashboard.tsx` - Main layout
- `QuickStats.tsx` - Gold, income, population widgets
- `WeeklyGoalsSummary.tsx` - Compact goal progress view
- `QuickActions.tsx` - Button grid for main actions

---

### 5.9 User Onboarding Flow

**Description:**
Tutorial for first-time users to understand the game loop.

**Flow:**
1. **Welcome Screen:** "Welcome to Gushkin! Build your town by completing real-life goals."
2. **Create First Goal:** Guided setup - "Let's create your first weekly goal (e.g., Exercise for 5 hours)"
3. **Log First Time Entry:** "Great! Now log some time you've already spent this week."
4. **Earn Gold:** "🎉 You earned 50 gold! Gold is used to build your town."
5. **Visit Town:** "Let's visit your empty town plot."
6. **Build First Building:** "Use your gold to build a Small House. Every town needs residents!"
7. **Unlock Businesses:** "Build 2 more houses, then you can build your first business!"
8. **First Business:** "Businesses generate passive income! Build a Bakery."
9. **Collect Income:** "Wait a few minutes... Now collect your income! This happens automatically."
10. **Complete:** "You're all set! Keep logging time weekly to grow your town."

**UI Components:**
- `OnboardingWizard.tsx` - Step-by-step tutorial with tooltips
- `TutorialOverlay.tsx` - Highlight specific UI elements

---

### 5.10 Authentication & User Management

**Description:**
Secure authentication and multi-device sync.

**Technical Details:**
- Auth0 for authentication (existing)
- JWT for API authorization
- All data synced via GraphQL backend
- Offline mode: View town and data (no actions until online)

---

## 6. User Flows

### 6.1 First-Time User Flow

1. **Landing Page** → Marketing site explaining the concept
2. **Sign Up** → Auth0 authentication
3. **Onboarding Tutorial** → Learn game mechanics
4. **Create First Goal** → "Exercise: 10 hours/week"
5. **Log Time** → "Worked out for 1 hour"
6. **Earn Gold** → Notification: "You earned 10 gold!"
7. **Build First House** → Purchase and place on town grid
8. **Continue Building** → Add more residential buildings
9. **Build First Business** → Bakery (generates income)
10. **Collect Income** → After time passes, collect passive income
11. **Weekly Cycle** → Complete goals, earn bonus, expand town

### 6.2 Daily/Weekly Usage Flow

**During the Week:**
1. **Login** → See dashboard with weekly goals progress
2. **Log Time** → After completing activities (e.g., "Worked out: 1.5 hours")
3. **Earn Gold** → Gold balance increases
4. **Collect Passive Income** → Click "Collect All" for accumulated business income
5. **Plan Purchases** → Browse building store, check requirements
6. **Expand Town** → Purchase new buildings when affordable
7. **Assign Workers** → Ensure businesses are staffed
8. **Check Progress** → View weekly goals progress bars

**End of Week (Sunday Night):**
1. **Review Progress** → See which goals were completed
2. **Earn Bonuses** → 50% bonus gold for completed goals
3. **Celebration** → Animation/notification for successful week
4. **Reset** → Goals reset for new week on Monday

**Town Management:**
1. **View Town Map** → Pan around town, zoom in/out
2. **Collect Income** → Tap buildings or use "Collect All"
3. **Build/Upgrade** → Place new buildings, upgrade existing ones
4. **Reorganize** → Move buildings (optional feature)
5. **Check Stats** → Review population, income rate, happiness

---

## 7. Technical Requirements

### 7.1 Frontend Stack
- **Framework:** React 16.13.1+ with TypeScript 4.0.3+
- **State Management:** Apollo Client 3.1.1 (GraphQL)
- **Routing:** React Router DOM 5.2.0
- **Styling:** React JSS 10.4.0 or CSS Modules
- **Graphics:** HTML5 Canvas or SVG for town map
- **Animation:** React Spring or Framer Motion for celebrations
- **Icons:** FontAwesome
- **Date/Time:** Moment.js or date-fns

### 7.2 Backend Requirements
- **API:** GraphQL (Apollo Server recommended)
- **Database:** PostgreSQL or MongoDB
  - Store: Users, WeeklyGoals, TimeEntries, GoldTransactions, BuildingTemplates, PlacedBuildings, TownMaps
- **Authentication:** JWT validation (Auth0)
- **Scheduled Jobs:**
  - Weekly goal reset (Monday 12:00 AM)
  - Income calculation (continuous or periodic)
  - Bonus gold distribution for completed goals
- **Real-time Updates:** Optional GraphQL subscriptions for income collection

### 7.3 Data Model Summary

```typescript
// Core entities
User { id, email, auth0Id, currentGold, createdAt }
WeeklyGoal { id, userId, name, weeklyTargetHours, goldPerHour, category, active }
TimeEntry { id, userId, goalId, durationMinutes, loggedAt, weekStartDate, goldEarned }
GoldTransaction { id, userId, amount, type, description, timestamp }

// Town-building entities
BuildingTemplate { id, name, type, purchaseCost, width, height, baseIncomePerHour, providesPopulation, requiresWorkers }
PlacedBuilding { id, userId, templateId, gridX, gridY, upgradeLevel, status, placedAt, lastIncomeCollectedAt }
TownMap { userId, gridWidth, gridHeight, buildings }

// Computed queries
WeeklyProgress { goal, totalMinutesLogged, percentComplete, goldEarned }
TownStats { totalPopulation, employedCitizens, incomePerHour, happinessScore }
PendingIncome { totalPending, lastCollectedAt }
```

### 7.4 Performance Requirements
- Town map renders smoothly with 100+ buildings
- Income calculation efficient (server-side, cached)
- Dashboard loads in < 2 seconds
- Time logging updates gold balance in real-time
- Mobile-responsive design (especially for time logging)

### 7.5 Art & Assets
- **Building Sprites:** 2D isometric or top-down pixel art style
- **UI Assets:** Buttons, icons, progress bars (cohesive design)
- **Animations:** Building construction, income collection, gold earning
- **Suggested Style:** Colorful, friendly, approachable (like Stardew Valley or Hay Day)

### 7.6 Future Enhancement: 3D Rendering
- Consider Three.js or Babylon.js for 3D town view
- Requires 3D models instead of 2D sprites
- Significantly more complex but more immersive

---

## 8. Success Metrics

### 8.1 User Engagement
- **Weekly Active Users (WAU):** Target 70% of registered users
- **Weekly Goal Completion Rate:** Target 60% of users complete at least 1 goal per week
- **Average Time Logged:** Target 10+ hours logged per user per week
- **Town Visit Frequency:** Target 3+ times per week
- **Session Duration:** Average 8-12 minutes (time logging + town management)
- **Retention:** 60% at 30 days, 40% at 90 days

### 8.2 Game Progression
- **Buildings Built:** Average 10 buildings per user in first month
- **Income Generation:** 50% of users have positive passive income within 2 weeks
- **Upgrade Rate:** 30% of users upgrade at least 1 building

### 8.3 Monetization (Future)
- **Premium Buildings:** Exclusive building designs for premium users
- **Town Expansions:** Paid land expansions beyond free limit
- **Customization:** Premium themes, decorations, building skins
- **Target:** 5-10% conversion to premium

---

## 9. Competitive Analysis

| Feature | Gushkin | Habitica | Farmville | Todoist |
|---------|---------|----------|-----------|---------|
| **Time-based goals** | ✅ Weekly | ❌ Daily only | ❌ | ❌ |
| **Town-building** | ✅ Full simulation | ❌ Avatar only | ✅ | ❌ |
| **Passive income** | ✅ Buildings generate gold | ❌ | ✅ Crops grow | ❌ |
| **Visual progression** | ✅ Growing town | ⚠️ Avatar gear | ✅ Farm | ❌ |
| **Real productivity** | ✅ Time tracking | ⚠️ Simple tasks | ❌ Pure game | ✅ Tasks only |
| **Gamification** | ✅✅ Full game | ✅ RPG elements | ✅✅ Full game | ⚠️ Minimal |

**Gushkin's Unique Position:** Only app combining time-based productivity tracking with full town-building simulation and passive income mechanics.

---

## 10. Roadmap

### Phase 1: MVP (Months 1-3)
**Goal:** Prove core game loop works

- Weekly time-based goals system
- Time logging and gold earning
- Basic town map (10x10 grid, drag-and-drop)
- 10 building templates (3 residential, 4 commercial, 3 decorative)
- Citizen/population system
- Passive income generation
- Collect income functionality
- Basic dashboard
- Authentication (Auth0)

**Success Criteria:** 100 active users, 60% weekly goal completion, 10+ buildings per user

---

### Phase 2: Core Features (Months 4-6)
**Goal:** Enhance gameplay depth

- Building upgrades (3 levels)
- Happiness system
- 20 more building types
- Town expansion (buy adjacent plots)
- Building unlock system (milestones)
- Weekly bonus gold for goal completion
- Improved onboarding tutorial
- Time entry history and editing
- Mobile optimization

**Success Criteria:** 500 active users, 70% retention at 30 days

---

### Phase 3: Social & Progression (Months 7-9)
**Goal:** Add longevity and community

- **Social Features:**
  - Friend system (visit friends' towns)
  - Leaderboards (most productive, biggest town)
  - Gift buildings to friends
  - Town showcase (public gallery)

- **Advanced Progression:**
  - Achievements system (badges for milestones)
  - Town themes (unlock visual styles)
  - Special events (double gold weekends)
  - Seasonal decorations

- **Quality of Life:**
  - Multi-select buildings
  - Town templates/blueprints
  - Statistics dashboard (charts, trends)
  - Export weekly reports (PDF)

**Success Criteria:** 2,000 active users, 50% have friends, 40% retention at 90 days

---

### Phase 4: Monetization & Polish (Months 10-12)
**Goal:** Sustainable business model

- **Premium Features:**
  - Premium building designs (exclusive aesthetics)
  - Larger town plots (30x30 for premium)
  - Premium themes (steampunk, fantasy, sci-fi)
  - Boost timers (2x income for 1 hour)
  - Priority support

- **Content Expansion:**
  - 50+ total buildings
  - Dynamic events (random bonuses)
  - Quests system (special challenges for mega rewards)
  - Rare buildings (low % drop from achievements)

- **Mobile App:**
  - React Native mobile apps (iOS & Android)
  - Push notifications (goal reminders, income ready)
  - Widgets (quick time logging, town preview)

**Success Criteria:** 5,000 active users, 7% premium conversion, break-even on costs

---

### Phase 5: Advanced Simulation (Year 2+)
**Goal:** Deepen simulation mechanics

- **Complex Economy:**
  - Resource chains (factories need materials from farms)
  - Trade system (buy/sell resources)
  - Town specializations (industrial town vs. agricultural)

- **Citizens AI:**
  - Citizens have names, traits, preferences
  - Citizen satisfaction system
  - Random events affecting citizens

- **3D Graphics:**
  - Optional 3D town view (WebGL)
  - Camera controls, day/night cycle
  - Weather effects

- **Integrations:**
  - Fitness tracker sync (auto-log exercise time)
  - Calendar integration (block time for goals)
  - Smart home integration (track activities automatically)

---

## 11. Open Questions & Decisions Needed

### 11.1 Core Mechanics
1. **Should buildings have construction time?**
   - Pro: Adds strategic planning, more realistic
   - Con: Creates waiting, potential frustration
   - **Decision:** Start without, add later as optional feature for larger buildings

2. **Should there be maintenance costs?**
   - Pro: Adds economic strategy, prevents hoarding
   - Con: Could feel punishing, discourages building
   - **Decision:** No maintenance costs for MVP; consider for late-game buildings

3. **How should weekly reset work?**
   - Option A: Hard reset (progress lost if incomplete)
   - Option B: Rollover (incomplete hours carry to next week)
   - **Decision:** Hard reset but show "Next Week Preview" for motivation

4. **Can users edit/delete time entries?**
   - Pro: Fixes mistakes, flexibility
   - Con: Potential cheating/exploitation
   - **Decision:** Allow edit within 24 hours, show edit history

### 11.2 Progression & Balance
5. **Building cost curve?**
   - Early buildings: 50-200 gold (2-4 hours work)
   - Mid buildings: 500-1,000 gold (10-20 hours work)
   - Late buildings: 2,000-5,000+ gold (weeks of work)

6. **Income generation rates?**
   - Should balance: Passive income < Active earning (to encourage continued goal completion)
   - Suggested: Max passive income = 50% of active earning potential
   - Example: User earns 100 gold/hour from goals, max town income = 50 gold/hour

7. **Unlock progression pace?**
   - Should users unlock all buildings in 3 months? 6 months? 1 year?
   - **Decision:** 6-month unlock curve for non-premium content

### 11.3 Technical
8. **How to calculate income efficiently?**
   - Option A: Background job every 5 minutes updates all users
   - Option B: Calculate on-demand when user collects
   - **Decision:** Option B (on-demand) for simplicity, cache results

9. **Town map rendering approach?**
   - Option A: HTML5 Canvas (better performance)
   - Option B: SVG (easier interactions, accessibility)
   - **Decision:** Canvas for town view, SVG for UI elements

10. **Should we support town sharing/screenshots?**
    - Yes - users will want to share accomplishments
    - Implement "Share My Town" button → generates image

### 11.4 User Experience
11. **Should time logging be manual or automatic?**
    - Manual: User enters duration after completing activity
    - Automatic: Timer runs while user works (like Toggl)
    - **Decision:** Both - quick manual entry + optional timer mode

12. **How to prevent time logging fraud?**
    - Problem: Users could log fake hours to earn gold
    - Solutions:
      - Daily/weekly caps on time logging
      - Plausibility checks (e.g., max 8 hours logged per goal per day)
      - Social accountability (friends can see activity)
    - **Decision:** Implement daily caps per goal (e.g., max 8 hours/day per goal)

---

## 12. Risks & Mitigation

### 12.1 Product Risks

**Risk:** Users exploit system by logging fake time
- **Mitigation:** Daily caps, plausibility checks, focus on intrinsic motivation
- **Impact:** Medium | **Likelihood:** High

**Risk:** Passive income removes motivation to complete goals
- **Mitigation:** Cap passive income at 50% of active earning, make new content require active gold
- **Impact:** High | **Likelihood:** Medium

**Risk:** Game becomes too complex, overwhelming users
- **Mitigation:** Excellent onboarding, progressive disclosure, tooltips everywhere
- **Impact:** High | **Likelihood:** Medium

**Risk:** Building art assets are expensive/time-consuming
- **Mitigation:** Start with simple pixel art, use procedural generation, community contributions
- **Impact:** Medium | **Likelihood:** High

### 12.2 Technical Risks

**Risk:** Town rendering performance issues with many buildings
- **Mitigation:** Canvas-based rendering, viewport culling, lazy loading
- **Impact:** High | **Likelihood:** Medium

**Risk:** Income calculation at scale (thousands of users)
- **Mitigation:** On-demand calculation, caching, efficient database queries
- **Impact:** Medium | **Likelihood:** Low

**Risk:** Mobile performance (especially town map)
- **Mitigation:** Optimize early, use requestAnimationFrame, limit animations
- **Impact:** High | **Likelihood:** Medium

### 12.3 Business Risks

**Risk:** Users don't find the game compelling enough
- **Mitigation:** Beta testing, user interviews, iterate quickly on feedback
- **Impact:** Critical | **Likelihood:** Medium

**Risk:** Habitica/similar apps already dominate market
- **Mitigation:** Focus on unique value prop (town-building + time-based goals), target different audience
- **Impact:** High | **Likelihood:** High

**Risk:** Monetization strategy fails (users won't pay)
- **Mitigation:** Ensure free version is fully functional, premium is purely aesthetic/convenience
- **Impact:** Medium | **Likelihood:** Medium

---

## 13. Appendix

### A. Glossary

- **Weekly Goal:** A time-based commitment for the current week (e.g., "Exercise: 10 hours")
- **Time Entry:** A log of time spent on a goal (e.g., "Worked out: 1.5 hours")
- **Gold:** Primary currency earned by logging time and completing goals
- **Building:** A structure placed in the town (houses, businesses, decorations)
- **Placed Building:** An instance of a building template in a user's town
- **Citizen:** Population unit provided by residential buildings
- **Worker:** Citizen assigned to a commercial/industrial building
- **Passive Income:** Gold generated automatically by businesses over time
- **Upgrade Level:** Buildings can be upgraded (Level 1, 2, 3) for better stats
- **Happiness:** Town metric that multiplies income generation
- **Town Map:** Grid-based layout where buildings are placed

### B. Example Building List (MVP)

**Residential:**
1. Small House (50 gold, 2x2, 2 citizens)
2. Apartment (200 gold, 2x3, 5 citizens)
3. Mansion (500 gold, 3x3, 10 citizens)

**Commercial:**
4. Bakery (100 gold, 2x2, 2 workers, 5 gold/hour)
5. Market (150 gold, 3x2, 3 workers, 8 gold/hour)
6. Restaurant (300 gold, 3x3, 4 workers, 12 gold/hour)

**Industrial:**
7. Farm (200 gold, 4x4, 3 workers, 10 gold/hour)
8. Factory (400 gold, 4x3, 5 workers, 15 gold/hour)

**Decorative:**
9. Park (75 gold, 2x2, +5% happiness)
10. Fountain (150 gold, 2x2, +10% happiness)

### C. Example User Journey

**Week 1: Sarah joins Gushkin**
- Sets goals: Exercise (10h), Guitar (5h), Reading (8h)
- Monday-Friday: Logs 8h exercise, 3h guitar, 6h reading
- Earns: 170 gold (8*10 + 3*10 + 6*10)
- Builds: 3 Small Houses (150 gold), has 20 gold left
- Town: 6 citizens, no income yet

**Week 2: Building economy**
- Completes Exercise goal (10h), earns 100 base + 50 bonus = 150 gold
- Partial guitar (4h = 40 gold) and reading (7h = 70 gold)
- Total new gold: 260 gold + 20 from last week = 280 gold
- Builds: Bakery (100g), Park (75g), Market (150g)
- Assigns 5 citizens to work → Now has 13 gold/hour income!

**Week 3: Passive income kicks in**
- Hasn't opened app since Monday morning
- Friday afternoon: Opens app → "Collect Income" shows 1,200 gold pending! (13 gold/hour * 96 hours)
- Feels amazing! Rewards real-life productivity with game progression
- Uses gold to expand town further...

### D. References

**Inspiration:**
- [Habitica](https://habitica.com) - Habit tracking gamification
- [Stardew Valley](https://www.stardewvalley.net/) - Town-building aesthetics
- [Farmville](https://en.wikipedia.org/wiki/FarmVille) - Social farming simulation
- [Adventure Capitalist](https://en.wikipedia.org/wiki/AdVenture_Capitalist) - Idle game income mechanics
- [Hay Day](https://en.wikipedia.org/wiki/Hay_Day) - Town management

**Technical:**
- [Auth0 Documentation](https://auth0.com/docs)
- [Apollo GraphQL](https://www.apollographql.com/docs/react/)
- [HTML5 Canvas Tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

### E. Document History

- **v1.0** (Nov 4, 2025) - Initial PRD based on existing codebase
- **v2.0** (Nov 4, 2025) - Complete revision with town-building simulation and weekly time-based goals

---

**Document Status:** Living Document - Active Development
**Next Review Date:** December 1, 2025
**Feedback:** Please share thoughts on game balance, building ideas, and technical approach!
