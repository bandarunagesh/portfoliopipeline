import {useState, useEffect, useCallback, useMemo} from 'react';
import { styled } from '@mui/material/styles';
import { Box, MenuItem, FormControl, InputLabel, Select, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Papa from 'papaparse';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


export default function FileUpload({onFileUpload}){
    const [data, setData] = useState([]);
    const [gltFitler, setGltFilter] = useState([]);
    const [duFilter, setDuFilter] = useState([]);
    const [gltValue, setGltValue] = useState("");
    const [duValue, setDuValue] = useState("");

    useEffect(() => {
        const glt = new Set()
        const du = new Set()
        data.map((item) => {
            glt.add(item.GLT)
            du.add(item.DU)
        })
        setGltFilter(Array.from(glt))
        setDuFilter(Array.from(du))
    }, [data])
    
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        Papa.parse(file, {
            complete: (result) => {
                setData(result.data);
            },
            header: true,
        });
    };

    const filterData = useCallback(() => {
        let filterdData = data; 
        if(gltValue){
            filterdData = filterdData.filter(item => gltValue == item.GLT)
        }
        if(duValue){
            filterdData = filterdData.filter(item => duValue == item.DU)
        }
        return filterdData
    }, [data, gltValue, duValue])

    const handleFileData = (data) => {
        const finalData = {};
        data.map((item) => {
            if(!item?.Bucket) return;
            if (!finalData?.[item.Bucket]) {
                finalData[item.Bucket] = {}
            }
            const existingVal = parseInt(finalData[item.Bucket]?.[item.Color] || 0)
            finalData[item.Bucket][item.Color] = existingVal + parseInt(item.Value)
        })
        return finalData
    }

    useEffect(() => {
        console.log(data);
        const filterdData = filterData()
        if(filterdData){
            const modifiedData = handleFileData(filterdData)
            onFileUpload(modifiedData);
            console.log(modifiedData);
        }
    },[data, filterData])
    

    return(<>
        <Typography variant='body1'>Upload CSV file</Typography>
        <Button
            component="label"
            role={'upload'}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
        >
            Upload files
            <VisuallyHiddenInput
                type="file"
                onChange={handleFileChange}
                mulitple
            />
        </Button>
        <Box marginTop={"1rem"} display={"flex"} columnGap={"1rem"}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">GLT</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gltValue}
                    label="GLT"
                    onChange={(e) => setGltValue(e.target.value)}
                >
                    {gltFitler?.map((item, index) => {
                        return (
                            <MenuItem key={index} value={item}>{item}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">DU</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={duValue}
                    label="DU"
                    onChange={(e) => setDuValue(e.target.value)}
                >
                    {duFilter?.map((item, index) => {
                        return (
                            <MenuItem key={index} value={item}>{item}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </Box>
    </>)
}