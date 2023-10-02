import { Box,Typography,Stack,Pagination } from '@mui/material'
import React, {  useEffect, useState } from 'react'
import axios from 'axios'; 
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton';
// import Pagination from '../components/Pagination';

export default function Home() {
    const [currentPage,setCurrentPage] = useState(1)
    const [currenciesPerPage] = useState(10)
    const [data , SetData ] = useState([]);
    const [Loading , SetLoading ] = useState(false);
    const [error , SetError ] = useState();

    const BaseUrl = 'https://belarusbank.by/api/kursExchange'; 
    
    useEffect(()=>{
        SetLoading(true);
        axios.get(BaseUrl).then((res)=>{
            SetData(res.data);
            console.log(res.data);
            SetLoading(false);

        })
    },[])
    const lastCurrencyIndex = currentPage * currenciesPerPage;
    const firstCurrencyIndex = lastCurrencyIndex - currenciesPerPage;
    const currentCurrency = data.slice(firstCurrencyIndex,lastCurrencyIndex)
    
    const handleChangePage = (e, p) => {
      setCurrentPage(p);
    };
    const PaginationRounded = () => {
      const numbers = [
        ...Array(Math.ceil(data.length / currenciesPerPage) + 1).keys(),
      ].slice(1);
      const pageNumb = Math.ceil(data/currenciesPerPage);

    // for(let i=1;i <= Math.ceil(totalCurrencies/currenciesPerPage);i++){
    //     pageNumb.push(i)
    // }
      return (
        <Stack spacing={2}>
          <Pagination
            count={numbers.length}
            variant="outlined"
            shape="rounded"
            onChange={handleChangePage}
          />
        </Stack>
      );
    };

    function createData(_in, _out) {
        return { _in, _out};
      }

 function LoadingComponent() {
  return (
    <>
      <Box >
        <Stack sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh',ml:'660px',position:'absolute',zIndex:'10'}}>
            <CircularProgress />
        </Stack>
            <Skeleton variant="rounded" width='90vw' height={600} sx={{ marginLeft:'60px'}}/>
      </Box>
    </>
  )
}
      const rows = [
        createData(currentCurrency.map((currency)=>currency.USD_in)),
        createData(currentCurrency.map((currency)=>currency.USD_out)),
      ];

    return (
    <>
        {Loading ? <LoadingComponent/>: 
      <Box mt={4}mb={4} ml={10}>
            <Typography fontSize='35px' textAlign='center'mb={4}>Daily Currency Rates From BelarusBank</Typography>
         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead >
          <TableRow>
            <TableCell><Typography  fontSize='25px' fontWeight='700'>Обменныe пункты/Валюты</Typography></TableCell>
                <TableCell align="right"><Typography fontSize='15px'>USD buy / USD sell</Typography></TableCell>
                <TableCell align="right"><Typography fontSize='15px'>EUR buy / EUR sell</Typography></TableCell>
                <TableCell align="right"><Typography fontSize='15px'>RUB buy / RUB sell</Typography></TableCell>
                <TableCell align="right"><Typography fontSize='15px'>GBP buy / GBP sell</Typography></TableCell>
                <TableCell align="right"><Typography fontSize='15px'>PLN buy / PLN sell</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentCurrency.map((currency,index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              
            >
              <TableCell component="th" scope="row">
              {currency.filials_text}
              </TableCell >
              <TableCell align="right">{currency.USD_in}/{currency.USD_out}</TableCell>
              <TableCell align="right">{currency.EUR_in}/{currency.EUR_out}</TableCell>
              <TableCell align="right">{currency.RUB_in}/{currency.RUB_out}</TableCell>
              <TableCell align="right">{currency.GBP_in}/{currency.GBP_out}</TableCell>
              <TableCell align="right">{currency.PLN_in}/{currency.PLN_out}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {/* <Pagination
      currenciesPerPage={currenciesPerPage}
      totalCurrencies={data.length}
    /> */}
    <PaginationRounded/>
      </Box>
      }
    </>
  )
}
