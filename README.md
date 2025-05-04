# 🏋️‍♂️ MVP: Strength Progression Tracking App

A mobile app supporting Push-Pull-FBW training, helping to track progress, select appropriate warm-up and adaptively adjust weights according to double progression principles.

---

## 📦 APPLICATION BOOTSTRAP (project setup)

### ✅ TODO - initial project setup

- [✅] Initialize project: `npx create-expo-app`
- [ ] Configure TypeScript
- [ ] Install required libraries:
  - [ ] React Navigation
  - [ ] TankStack Query
  - [ ] Date-fns (date operations)
  - [ ] UUID (for exercise/session identifiers)
  - [ ] Tailwind
- [ ] Configure routing (`@react-navigation/native`, `stack` or `tabs`)
- [ ] Create project folders:
  ```
  /screens
  /components
  /hooks
  /lib
  /store
  /types
  /utils
  ```
- [ ] Feature base folder structure
- [ ] Configure data persistence (e.g., AsyncStorage, SQLite, Firebase or Supabase)

---

## 📱 BASIC VIEWS (screens)

- [ ] `HomeScreen` - list of upcoming workouts and option to start a new one
- [ ] `WorkoutBuilderScreen` - form for creating exercises / plans
- [ ] `ExerciseTemplateScreen` - view of saved exercises
- [ ] `WorkoutSessionScreen` - active workout view (checkboxes, inputs, weights)
- [ ] `HistoryScreen` - progression review
- [ ] `SettingsScreen` - progression/regression pace, default values

---

## 🚦 MVP LOGIC - TODO (functionalities)

### 🎯 Epic: Creating Exercise Templates and Training Plan

- [ ] Exercise template creator:
  - [ ] Input: exercise name
  - [ ] Input: number of working sets
  - [ ] Input: target repetitions
  - [ ] Select: approach type (straight sets / ramping)
  - [ ] Select: muscle group type (large / small)
  - [ ] Input: initial weight (kg)
- [ ] Automatic setting of default parameters with editing option:
  - [ ] Progression rate based on muscle group type:
    - [ ] Large groups: 2.5-5% (e.g., squat, bench press)
    - [ ] Small groups: 1-2.5% (e.g., biceps, triceps)
  - [ ] Regression rate (5-10%)
  - [ ] Rest between sets:
    - [ ] Large groups: 2-3 min
    - [ ] Small groups: 60-90 sec
- [ ] Training schedule:
  - [ ] Select: days of the week (e.g., Mon-Wed-Fri)
  - [ ] Option to assign training type to day (Push/Pull/FBW)
- [ ] Organization of exercises within the training plan

### 🔁 Epic: Warm-up Algorithm and Weight Selection

- [ ] Automatic warm-up calculator:
  - [ ] Determining number of warm-up sets:
    - [ ] Large groups: 2-3 sets
    - [ ] Small groups: 1-2 sets
  - [ ] Calculating weight for each warm-up set:
    - [ ] Set 1: 50-60% of working weight
    - [ ] Set 2: 70-80% of working weight
    - [ ] Set 3: 90% of working weight (only for large groups)
  - [ ] Adjusting repetitions: 8-5-3 (decreasing with each set)
- [ ] Implementation of working set types (MVP priority):
  - [ ] Straight sets: all sets with the same weight
  - [ ] Ramping sets: gradual weight increase in subsequent sets
- [ ] Preview of warm-up plan in workout details
- [ ] Interface for editing warm-up parameters (optional for MVP)

### 🏋️‍♂️ Epic: Starting and Executing a Workout

- [ ] List of exercises scheduled for the day
- [ ] View of each set (warm-up and working):
  - [ ] Suggested weight (based on progression from previous workouts)
  - [ ] Empty input field with suggested weight beside it
  - [ ] "Done" checkbox (for confirming suggested weight)
  - [ ] Option to edit weight (user can click input and enter actual weight used)
  - [ ] Visual indication of progression/regression status (up/down arrow)
- [ ] Validation of all sets completion (whether target repetitions were achieved)
- [ ] Saving session to database with status of each set (success, incomplete, modified weight)

### 📈 Epic: Double Progression - Core App Mechanism

- [ ] Automatic progression management system:
  - [ ] Analysis of completed sets after each workout:
    - [ ] If all sets and reps were completed: progression for next workout
      - [ ] Large groups: +2.5-5% (e.g., from 100kg to 102.5kg)
      - [ ] Small groups: +1-2.5% (e.g., from 10kg to 10.5kg)
    - [ ] If missing 1-2 reps only in last set: maintain weight
    - [ ] If missing >2 reps or in multiple sets: regression by 5-10%
- [ ] Visualization of progression status for the user:
  - [ ] Green up arrow for weight increase
  - [ ] Horizontal arrow for weight maintenance
  - [ ] Red down arrow for weight decrease
- [ ] Simple post-workout summary (e.g., "3/4 exercises with progression")

### 🗂 Epic: Training History (MVP scope)

- [ ] Basic workout history view:
  - [ ] List of completed workouts with dates
  - [ ] Preview of exercises performed in each workout
  - [ ] History of weights used for each exercise
- [ ] Simple training journal:
  - [ ] History of sets and reps for each exercise
  - [ ] Set status indication (completed/incomplete)
- [ ] Basic statistics (MVP):
  - [ ] Current personal record (PR) for each exercise
  - [ ] Comparison of current weight with initial weight
- [ ] Progress reset function for selected exercise (deload or restart)

---

## 🔜 Features outside MVP scope (to consider in future)

- [ ] Advanced working set types:
  - [ ] Mixed: ramp + back-off (e.g., 80kg → 90kg → 100kg → 90kg)
  - [ ] Drop sets, Rest-pause and other special methods
- [ ] Export training data (PDF/CSV)
- [ ] Advanced analyses and progression charts
- [ ] Automatic suggestions during stagnation
- [ ] Integration with Google Fit / Apple Health
- [ ] Offline version with full synchronization

---

## 📌 Key App Mechanisms (MVP)

### 🔧 Double Progression Implementation

- System automatically suggests weight values based on:
  - Muscle group type (large/small)
  - Results of previous workouts
  - Double Progression rules (first complete all reps, then increase weight)
- Decision-making algorithm:
  1. Complete execution of all sets → progression to next workout
  2. Partial execution → weight maintenance
  3. Failure to complete most repetitions → regression

### 📊 Training Data Structure

- Each working set has statuses:
  - `success` (completed all planned repetitions)
  - `incomplete` (completed some repetitions)
  - `modified_weight` (user changed suggested value)
- Warm-up sets are automatically calculated as % of working weight

### 🎛️ User Interaction

- Each input has a default (suggested) value
- User can edit any value by clicking on the input field
- Confirmation of set completion by checkbox
- Visual progression/regression indicators for quick understanding

---
