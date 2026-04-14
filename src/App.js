import React ,{Component} from 'react';
import ParticlesBg from 'particles-bg'; 
import Navigation from './components/Navigation/navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecogniton from './components/FaceRecogniton/FaceRecogniton';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/imagelink';
import './App.css';


const initialState={
      input: '', 
      imageUrl:'',
      box:{},
      route:'Signin',
      isSignedIn:false,
      user:{
            id:'',
            name:'',
            email:'',
            entries:0,
            joined:''
      }
    }
class App extends Component{
  constructor(){
    super(); 
    this.state=initialState;
  }
  onInputChange=(event)=>{
    this.setState({input:event.target.value});
  }

  loadUser=(data)=>{
    this.setState({user:{
      id:data.id, 
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
    }})
  }

  calculateFaceLocation=(data)=>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box; 
    const image = document.getElementById('inputimage');
    const width = Number(image.width); 
    const height = Number(image.height);
    return {
      leftCol:clarifaiFace.left_col*width,  
      topCol:clarifaiFace.top_row*height,
      rightCol:width - (clarifaiFace.right_col*width), 
      bottomRow:height-(clarifaiFace.bottom_row*height),
    }
  }

  displayFaceBox=(box)=>{
    this.setState({box:box});
  }

onButtonSubmit = () => {
    const input = this.state.input;
    this.setState({ imageUrl: input });
    
    fetch('https://smart-brain-api-yqte.onrender.com/clarifai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: input })
    })
    .then(res => res.json())
    .then(data => {
        if (!data.outputs || !data.outputs[0].data.regions) {
            console.log("No face detected or API error");
            return;
        }

        this.displayFaceBox(this.calculateFaceLocation(data));

        return fetch('https://smart-brain-api-yqte.onrender.com/image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: this.state.user.id })
        });
    })
    .then(res => {
        if (!res) return; 
        return res.json();
    })
    .then(count => {
        if (count === undefined) return;
        this.setState(prevState => ({
            user: { ...prevState.user, entries: count }
        }));
    })
    .catch(err => console.log(err));
};
  

  onRouteChange=(route)=>{
    if(route==='Signin'){
      this.setState(initialState)
    }else if(route==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route:route}); 
  }

  render (){
    const {isSignedIn,box,imageUrl,route}=this.state; 
    return(
      <div className="App">
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route==='home' 
          ?<div> 
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm 
              onInputChange={this.onInputChange}  
              onButtonSubmit={this.onButtonSubmit}/>
          
            <FaceRecogniton box={box} imageUrl={imageUrl}/>
          </div>
          :(route==='Signin'
            ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          ) 
        }
        <ParticlesBg type="color" num={2} bg={true} /> 
      </div>
    );
  }
}

export default App;
