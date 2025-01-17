import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/Footer';


// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Courses() {
  

  const [Courses, setCourses] = useState([]);
  
  async function buyCourse(courseId) {
    const token = localStorage.getItem('token');
    
    axios.defaults.headers.common['Authorization'] = token;
    console.log(courseId);
    const response = await axios.post(`http://localhost:3000/users/courses/${courseId}`)
                                    .then((res) => {console.log(res)})
                                    .catch((err) => console.log(err));
        return
  }
  
  
  
  async function getCourses() {
    
    const response = await axios.get("http://localhost:3000/users/courses");
    
    const Courses = response.data.courses;
    
    setCourses([...Courses]); 
    
    return
  };
  
  useEffect(() => {
    
    getCourses()
    return () => {
    }
  }, [])
  
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Courses
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Courses
            </Typography>

          </Container>
        </Box>
        <Container sx={{ py: 4 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {Courses.map((card) => (
              
              <Grid item key={card._id} xs={12} sm={6} md={4}>
              
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    // image="https://source.unsplash.com/random?wallpapers"
                    image= {card.imageLink}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2" >
                      {card.title}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={()=> buyCourse(card._id)} >Buy</Button>
                    <Button size="small">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>

      <Footer/>

    </ThemeProvider>
  );
}