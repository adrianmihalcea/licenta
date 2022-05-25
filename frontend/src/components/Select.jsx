import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Select = () =>
{
    const navigate = useNavigate();

    const handleViewButton = (event) => {
        console.log("1");
        // this.state.matureFlag = !this.state.matureFlag;
        // this.forceUpdate();
        navigate('/view');
    }
    
    const handleUploadButton = (event) => {
        // this.state.futureFlag = !this.state.futureFlag;
        // this.forceUpdate();
        navigate('/upload');
    }

    return(<>
        <h1>Select desired action</h1>
        <Button onClick={handleViewButton}>View</Button>
        <Button onClick={handleUploadButton}>Upload</Button>
    </>);
}
 
export default Select;
