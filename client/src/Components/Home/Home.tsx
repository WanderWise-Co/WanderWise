// Home.tsx
import styles from './Home.module.css';
import Header from '../singleComponent/Header'
import Footer from '../singleComponent/Footer'
import FormReq from '../singleComponent/FormReq'
export default function Home()  {
  return (
    <>
      <Header></Header>

      <FormReq></FormReq>
      
      <Footer></Footer>
    
    </>
  );
}