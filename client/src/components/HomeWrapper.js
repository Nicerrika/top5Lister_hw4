import { useContext } from 'react'
import HomeScreen from './HomeScreen'
import SplashScreen from './SplashScreen'
import ErrorScreen from './ErrorScreen'
import AuthContext from '../auth'

export default function HomeWrapper() {
    const { auth } = useContext(AuthContext);
    console.log("HomeWrapper auth.loggedIn: " + auth.loggedIn);
    
    // if (auth.loggedIn && !auth.error){
    //     return <HomeScreen />
    // }
    // else if (!auth.loggedIn && !auth.error){
    //     return <SplashScreen />
    // }
    // else if (!auth.loggedIn && auth.error){
    //     console.log("oh my god")
    //     return <ErrorScreen/>
    // }

    if (auth.loggedIn){
        return <HomeScreen />
    }
    else {
        return <SplashScreen />
    }
}