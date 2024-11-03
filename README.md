# States an App Can Enter (Android)
- Created:   app has being opened and initial resources are allocated
- Started:   app is visible but may not be fully active
- Resumed:   app is ready for user interaction
- Paused:    app is visible; may be partially obscured (for example a dialog box might appear)
- Stopped:   app is hidden but might still hold memory resources
- Destroyed: app is terminated and the system has reclaimed resources that were being used

## States Considered for this App
- Resumed: the main focus is on allowing the user to navigate between pages (and whether they have
chosen the light/dark theme). When active and in the foreground, the user can interact with the
app, however, if the app is coming from a stopped state, the app should remember which page and
theme the user was last on 
- Stopped: when the app moves to the background, the current page is saved to AsyncStorage. 
- Destroyed: when the app is fully closed or terminated, the saved data from AsyncStorage ensures
that the user can resume from the same page upon reopening the app. 

**State Manager:** [AppStateManager.tsx](./state-managed/src/components/AppStateManager.tsx)