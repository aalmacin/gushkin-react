# Product Requirements Document (PRD)
## Gushkin - Habit Tracker & Reward System

**Version:** 1.0
**Last Updated:** November 4, 2025
**Product Owner:** [Your Name]
**Status:** Active Development

---

## 1. Executive Summary

Gushkin is a gamified habit tracking application inspired by Habitica that helps users build positive behaviors through a reward-based system. Users create custom activities (habits/goals), earn coins (funds) by completing them, and redeem those funds for personal rewards they define. The application combines behavior psychology with game mechanics to motivate consistent habit formation.

---

## 2. Product Vision

**Mission Statement:**
Empower individuals to build lasting positive habits by transforming daily goals into an engaging reward system that makes personal growth fun and tangible.

**Core Value Proposition:**
- **For individuals** who struggle with maintaining consistent habits
- **Gushkin** is a habit tracking app
- **That** gamifies personal development with customizable rewards
- **Unlike** generic habit trackers
- **Our product** lets users define both their habits AND rewards, creating a personalized motivation system

---

## 3. User Personas

### Primary Persona: "The Self-Improver"
- **Age:** 25-40
- **Goals:** Build better habits, increase productivity, achieve personal goals
- **Pain Points:**
  - Lacks motivation to maintain consistent habits
  - Generic habit trackers feel impersonal
  - Wants tangible rewards for accomplishments
- **Tech Savviness:** Moderate to High
- **Behavior:** Enjoys gamification, likes tracking progress, values customization

### Secondary Persona: "The Routine Builder"
- **Age:** 18-35
- **Goals:** Establish daily routines, improve health/wellness, manage time better
- **Pain Points:**
  - Needs external motivation
  - Struggles with accountability
  - Finds traditional goal-setting boring
- **Tech Savviness:** Moderate
- **Behavior:** Responds well to visual progress indicators, likes immediate feedback

---

## 4. Core Features

### 4.1 Activities System (Habits/Goals)

**Description:**
Users create custom activities that represent habits or goals they want to track. Each activity can be positive (earning funds) or negative (spending funds).

**User Stories:**
- As a user, I want to create custom activities with descriptions and fund values so I can track my personalized habits
- As a user, I want to mark activities as positive or negative so I can track both good habits and behaviors to avoid
- As a user, I want to see all my activities in one place so I can easily access them

**Acceptance Criteria:**
- Users can create activities with:
  - Description (required)
  - Fund amount (required, numeric)
  - Type: Positive (earning) or Negative (spending)
- Activities are displayed in a list view
- Users can edit and delete activities
- Activity list shows fund amounts with currency formatting

**Technical Implementation:**
- GraphQL mutation: `createActivity`
- GraphQL query: `GET_ACTIVITIES`
- Components: `ActivityList.tsx`, `ActivityListItem.tsx`, `CreateActivity.tsx`
- Database: Activity entity with fields: id, description, positive, fundAmt

---

### 4.2 Daily Activity Tracking

**Description:**
Users can perform (check off) activities throughout the day, earning or spending funds based on the activity type.

**User Stories:**
- As a user, I want to mark activities as completed so I can earn or spend funds
- As a user, I want to see today's completed activities with timestamps so I can review my daily progress
- As a user, I want to see my total fund changes for the day so I can understand my daily performance

**Acceptance Criteria:**
- Users can click/tap to perform an activity
- Each performance is timestamped
- Today's activities view shows:
  - Activity description
  - Timestamp
  - Fund amount (+ or -)
  - Daily total (sum of all activities)
- Activities can be performed multiple times per day

**Technical Implementation:**
- GraphQL mutation: `performActivity`
- GraphQL query: `GET_ACTIONS` (filtered by date)
- Components: `TodaysActivities.tsx`
- Database: Action entity with fields: id, actionTimestamp, activity (relationship)

---

### 4.3 Streak Tracking

**Description:**
Visual representation of activity consistency over time, showing how many times each activity was performed per day.

**User Stories:**
- As a user, I want to see my activity streaks so I can visualize my consistency
- As a user, I want to see daily counts for each activity so I can track frequency
- As a user, I want to maintain motivation by seeing my streak patterns

**Acceptance Criteria:**
- Streak view displays activities grouped by day
- Shows count of times each activity was performed per day
- Visual indicators for different count levels
- Historical data available (not just current week)

**Technical Implementation:**
- GraphQL query: `GET_ACTION_COUNT`
- Component: `Streaks.tsx`
- Database: ActionCount entity with fields: activity, count, day

---

### 4.4 Funds System (Currency/Coins)

**Description:**
Users earn and spend "funds" (coins) by performing activities. Funds are the currency used to purchase rewards.

**User Stories:**
- As a user, I want to see my current fund balance prominently so I always know how many coins I have
- As a user, I want funds to automatically update when I perform activities
- As a user, I want to see my fund balance displayed as currency

**Acceptance Criteria:**
- Current funds displayed in header/prominent location
- Funds update in real-time after performing activities
- Funds formatted as currency (e.g., "$25.00")
- Funds cannot go negative (validation required)
- Visual fund bar shows progress

**Technical Implementation:**
- GraphQL query: `GET_CURRENT_FUNDS`
- Component: `CurrentFunds.tsx`
- Function: `displayNormalMoney()` for formatting
- Backend: Calculate current funds from activity history

---

### 4.5 Store System (Rewards/Wishes)

**Description:**
Users create a wishlist of rewards they want to "purchase" with their earned funds. Items can be real purchases, privileges, or personal treats.

**User Stories:**
- As a user, I want to create wishes with descriptions and prices so I can define my rewards
- As a user, I want to prioritize wishes so I can focus on what matters most
- As a user, I want to add optional source URLs to wishes so I can link to products or ideas
- As a user, I want to see all my wishes organized by priority

**Acceptance Criteria:**
- Users can create wishes with:
  - Description (required)
  - Price in funds (required, numeric)
  - Priority level (VERY_HIGH, HIGH, MEDIUM, LOW, VERY_LOW)
  - Source URL (optional)
  - Status (not_bought, bought, disabled)
- Wishes displayed in organized list
- Visual indicators for priority levels
- Prices displayed as currency

**Technical Implementation:**
- GraphQL mutations: `createWish`, `updateWish`
- GraphQL query: `GET_WISHES`
- Components: Store page components
- Database: Wish entity with fields: id, description, price, source, priority, status

---

### 4.6 Shopping Cart & Purchase System

**Description:**
Users can add wishes to a cart, see the total cost, and complete purchases when they have sufficient funds.

**User Stories:**
- As a user, I want to add wishes to a cart so I can purchase multiple items at once
- As a user, I want to see my cart total so I know if I can afford my selections
- As a user, I want visual feedback when items are in my cart
- As a user, I want to remove items from my cart if I change my mind
- As a user, I want to complete purchases and have my funds deducted

**Acceptance Criteria:**
- Cart sidebar shows all selected wishes
- Cart displays total cost
- Visual indicators show which wishes are in cart
- Users cannot purchase if insufficient funds
- Successful purchase:
  - Deducts funds from balance
  - Marks wishes as "bought"
  - Clears cart
  - Shows confirmation

**Technical Implementation:**
- Apollo Reactive Variables for local cart state
- GraphQL mutations for purchase completion
- Components: `Cart.tsx`, `CartTotal.tsx`
- File: `Cart.local.ts` for cart state management

---

### 4.7 Purchase History

**Description:**
Users can view all previously purchased items to review their rewards history.

**User Stories:**
- As a user, I want to see my purchase history so I can review what I've bought
- As a user, I want to feel accomplished by seeing my reward collection

**Acceptance Criteria:**
- Display all wishes with status "bought"
- Show purchase date/time
- Display price paid
- Sortable/filterable list

**Technical Implementation:**
- GraphQL query: Filter wishes by status="bought"
- Component: `BoughtItems.tsx`

---

### 4.8 Authentication & Security

**Description:**
Secure user authentication using Auth0 to protect user data and enable multi-device access.

**User Stories:**
- As a user, I want to log in securely so my data is protected
- As a user, I want to access my data from multiple devices
- As a user, I want to stay logged in across sessions

**Acceptance Criteria:**
- Auth0 integration for authentication
- JWT token management
- Protected routes require authentication
- Automatic token refresh
- Logout functionality

**Technical Implementation:**
- Auth0 React SDK (@auth0/auth0-react)
- JWT stored in localStorage
- Apollo Client middleware for auth headers
- Protected route components

---

## 5. User Flows

### 5.1 First-Time User Flow

1. **Landing Page** → User arrives at home page
2. **Sign Up/Login** → User authenticates via Auth0
3. **Main Dashboard** → User sees empty state with prompts
4. **Create First Activity** → User creates their first habit/goal
5. **Perform Activity** → User completes the activity, earns funds
6. **Create First Wish** → User adds a reward to the store
7. **Purchase Goal** → User saves up and buys their first reward

### 5.2 Daily Usage Flow

1. **Login** → User authenticates
2. **View Dashboard** → See current funds and today's activities
3. **Complete Activities** → Mark off completed habits, earn funds
4. **Check Progress** → View streaks and daily totals
5. **Browse Store** → Review available rewards
6. **Make Purchase** → Buy reward when sufficient funds available
7. **Logout** → End session

### 5.3 Activity Creation Flow

1. **Navigate to Activities** → Click on activities section
2. **Click "Create Activity"** → Open creation form
3. **Fill Details:**
   - Enter description (e.g., "Morning workout")
   - Set fund amount (e.g., "$5.00")
   - Select type (positive/negative)
4. **Submit** → Activity added to list
5. **Confirmation** → See new activity in list

### 5.4 Purchase Flow

1. **Browse Store** → View available wishes
2. **Add to Cart** → Select desired items
3. **Review Cart** → Check items and total cost
4. **Check Funds** → Verify sufficient balance
5. **Complete Purchase** → Confirm transaction
6. **Confirmation** → Funds deducted, items moved to "Bought"
7. **View History** → See purchased items in history

---

## 6. Weekly Goals Feature (Future Enhancement)

**Status:** Planned
**Priority:** High

### Description
Extend the current activity system to support weekly goal setting with progress tracking.

### Requirements
- Users can set weekly targets for activities (e.g., "Complete 5 workouts this week")
- Dashboard shows weekly progress bars for each goal
- Bonus funds awarded for achieving weekly targets
- Weekly summary/report generated on Sunday night/Monday morning
- Visual calendar view showing weekly completion status

### User Stories
- As a user, I want to set weekly goals for my activities so I can track longer-term consistency
- As a user, I want to earn bonus coins for achieving weekly targets so I feel extra motivated
- As a user, I want to see my weekly progress at a glance so I know if I'm on track

---

## 7. Technical Requirements

### 7.1 Frontend Stack
- **Framework:** React 16.13.1 with TypeScript 4.0.3
- **Routing:** React Router DOM 5.2.0
- **Styling:** React JSS 10.4.0 (CSS-in-JS)
- **State Management:** Apollo Client 3.1.1
- **Authentication:** Auth0 React SDK 1.0.0
- **Icons:** FontAwesome
- **Date/Time:** Moment Timezone 0.5.31
- **Build Tool:** React Scripts 3.4.1 (Create React App)

### 7.2 Backend Requirements
- **API:** GraphQL endpoint
- **Authentication:** JWT validation (Auth0)
- **Database:** Stores entities for:
  - Users
  - Activities
  - Actions (activity performances)
  - ActionCounts (streaks)
  - Wishes
  - Transactions/Purchases
- **Computed Fields:** Current funds calculation from activity history

### 7.3 Data Model

```typescript
User {
  id: ID!
  email: String!
  auth0Id: String!
  createdAt: DateTime!
}

Activity {
  id: ID!
  userId: ID!
  description: String!
  fundAmt: Float!
  positive: Boolean!
  createdAt: DateTime!
  actions: [Action!]!
}

Action {
  id: ID!
  userId: ID!
  activityId: ID!
  actionTimestamp: DateTime!
  activity: Activity!
}

ActionCount {
  activity: Activity!
  count: Int!
  day: Date!
}

Wish {
  id: ID!
  userId: ID!
  description: String!
  price: Float!
  source: String
  priority: Priority!
  status: WishStatus!
  createdAt: DateTime!
  purchasedAt: DateTime
}

enum Priority {
  VERY_HIGH
  HIGH
  MEDIUM
  LOW
  VERY_LOW
}

enum WishStatus {
  not_bought
  bought
  disabled
}
```

### 7.4 Performance Requirements
- Page load time < 2 seconds
- Activity performance updates in real-time
- Fund balance updates immediately after actions
- Support for 100+ activities and wishes per user
- Mobile-responsive design

### 7.5 Security Requirements
- All API requests authenticated with JWT
- User data isolated (users can only access their own data)
- Input validation on all forms
- XSS protection
- HTTPS required for production

---

## 8. Non-Functional Requirements

### 8.1 Usability
- Intuitive UI requiring no tutorial for basic usage
- Mobile-responsive (works on phones, tablets, desktop)
- Accessible (WCAG 2.1 AA compliance)
- Fast interaction feedback (< 100ms for UI updates)

### 8.2 Reliability
- 99.9% uptime target
- Graceful error handling with user-friendly messages
- Data persistence (no data loss)
- Automatic session recovery

### 8.3 Scalability
- Support thousands of concurrent users
- Efficient GraphQL queries with pagination
- Optimized database indexes
- CDN for static assets

### 8.4 Maintainability
- Comprehensive TypeScript typing
- Component documentation via Storybook
- Unit tests for critical components
- Clear code organization and separation of concerns

---

## 9. Success Metrics

### 9.1 User Engagement
- **Daily Active Users (DAU):** Target 60% of registered users
- **Weekly Active Users (WAU):** Target 80% of registered users
- **Session Duration:** Average 5-10 minutes per session
- **Activities Per User:** Average 3-5 activities performed per day
- **Return Rate:** 70% of users return within 7 days of signup

### 9.2 Feature Adoption
- **Activity Creation:** 80% of users create at least 3 activities
- **Store Usage:** 70% of users create at least 1 wish
- **Purchase Rate:** 50% of users make at least 1 purchase within 30 days
- **Streak Engagement:** 40% of users check streaks weekly

### 9.3 Business Metrics
- **User Retention:** 50% retention at 30 days
- **User Growth:** 10% month-over-month growth
- **User Satisfaction:** NPS score > 50

---

## 10. Future Enhancements (Roadmap)

### Phase 2: Social Features
- Friend system to compare progress
- Shared goals and team challenges
- Activity templates shared by community
- Leaderboards

### Phase 3: Advanced Gamification
- Achievement badges
- User levels and XP system
- Skill trees for different life areas
- Daily quests and challenges

### Phase 4: Weekly Goals System
- Weekly goal setting and tracking
- Bonus fund rewards for weekly completion
- Weekly summary reports
- Calendar view for weekly planning

### Phase 5: Analytics & Insights
- Personal analytics dashboard
- Habit formation insights
- Productivity patterns
- Exported reports (PDF, CSV)

### Phase 6: Mobile Native App
- iOS and React Native apps
- Push notifications for habit reminders
- Offline support
- Widget for quick habit tracking

### Phase 7: Integrations
- Calendar integration (Google Calendar, Outlook)
- Fitness tracker integration (Fitbit, Apple Health)
- Smart home integration for automated tracking
- Zapier/IFTTT support

---

## 11. Open Questions & Decisions Needed

1. **Weekly Goals Implementation:**
   - Should weekly goals be separate from activities or an extension?
   - How should bonus funds for weekly completion be calculated?
   - Should incomplete weeks carry over or reset?

2. **Negative Activities:**
   - Should negative activities allow users to go into debt (negative funds)?
   - Or should they be blocked if insufficient funds?

3. **Purchase Confirmation:**
   - Should users confirm before completing a purchase?
   - Should there be an "undo" option?

4. **Data Export:**
   - What data should users be able to export?
   - What format(s) should be supported?

5. **Mobile App Priority:**
   - Should we build PWA first or native apps?
   - What platforms should we prioritize (iOS vs Android)?

---

## 12. Dependencies & Risks

### Dependencies
- Auth0 service availability
- GraphQL backend API
- Third-party libraries (React, Apollo, etc.)

### Risks
- **User Motivation:** Users may lose interest if rewards aren't compelling
  - *Mitigation:* Provide reward templates and suggestions
- **Complexity Creep:** Too many features can overwhelm users
  - *Mitigation:* Phased rollout, user testing
- **Data Privacy:** Sensitive user habit data requires careful handling
  - *Mitigation:* Strong security measures, transparency
- **Technical Debt:** CRA and older React version
  - *Mitigation:* Plan for migration to newer tooling

---

## 13. Appendix

### A. Glossary
- **Activity:** A habit or goal that users track (formerly called "action")
- **Action:** A single instance of performing an activity
- **Funds:** The virtual currency users earn (also called "coins")
- **Wish:** A reward item that users can purchase with funds
- **Streak:** A visual representation of activity consistency over time
- **Positive Activity:** An activity that adds funds when performed
- **Negative Activity:** An activity that subtracts funds when performed

### B. References
- [Habitica](https://habitica.com) - Inspiration and competitive analysis
- [Auth0 Documentation](https://auth0.com/docs)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)

### C. Document History
- **v1.0** (Nov 4, 2025) - Initial PRD creation based on existing codebase

---

**Document Status:** Living Document
**Next Review Date:** December 1, 2025
