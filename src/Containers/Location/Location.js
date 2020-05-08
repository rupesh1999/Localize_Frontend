import React, {
    useState,
    useEffect,
} from 'react';
import Button from '@material-ui/core/Button';
import Navigation  from '../../Components/Layout/Navigation'
import MapGL, {
    Layer,
    LinearInterpolator,
    FlyToInterpolator,
    Marker
} from 'react-map-gl';
import locationMarker from '../../Assests/pin2.png'
import classes from './Location.module.css';
const MAPBOX_TOKEN = "pk.eyJ1IjoiYWJoaXBhbmRleTk2NTAiLCJhIjoiY2s4dWJtNTFiMDJ6eTNtbXpnbngyeDYwZiJ9.24rMXZqLjj23c1-1Xdcz4g"
const Location = (p) => {
    const [viewport, setViewport] = useState({
        latitude: 1,
        longitude: 1,
        zoom: 14,
        bearing: 0,
        pitch: 0
    });

    useEffect(() => {
        position()
    },[])
    const position = async () => {
        await navigator.geolocation.getCurrentPosition(
            position => setViewport({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                zoom: viewport.zoom,
                pitch: viewport.pitch,
                bearing: viewport.bearing
            })

        );

    }
    const goToNYC = async() => {
        await navigator.geolocation.getCurrentPosition((position)=>{
            const viewport = {
                longitude: position.coords.longitude,
                latitude:position.coords.latitude,
                zoom: 16,
                transitionDuration: 2000,
                transitionInterpolator: new FlyToInterpolator(),
    
            };
           setViewport(viewport)
        })
        
    };
    console.log(viewport)

    return (
        <div>
        <Navigation/>
        <MapGL {
            ...viewport
        }
        width = "100vw"
        height = "100vh"
        // 
        onViewportChange = {
            nextViewport => setViewport(nextViewport)
        }
        mapStyle = "mapbox://styles/abhipandey9650/ck9y9x6gp0jt91ipls7kobbox"
        mapboxApiAccessToken = {
            MAPBOX_TOKEN
        }

        >
            <Marker
            latitude={viewport.latitude}
            longitude = {viewport.longitude}
            >
                <div className={classes.locationMarker}>
                    <img className={classes.img}src= {locationMarker}/>
                </div>

            </Marker>
            <div className={classes.myLocation}>
        <Button  variant="contained" size="medium" color="primary" onClick = {
            goToNYC
        } > My Location</Button>
</div>
        </MapGL>
        </div>
    );
}

export default Location