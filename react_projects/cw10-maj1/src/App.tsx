import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import PageNotFound from './pages/PagenotFound';
import FormWithAction from './pages/FormWithAction';
import FormWithRef from './pages/FormWithRef';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children:[
      {index: true, element: <Home />},
      {path: "about",element: <About />},
      {path: "contact",element: <Contact />},
      {path: "form1",element: <FormWithRef />},
      {path: "form2",element: <FormWithAction />},
      {path: "*",element: <PageNotFound />},
    ]
  }
]);

function App() {


  return <RouterProvider router={router} />;
}

export default App
