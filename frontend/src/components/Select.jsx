import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Select = () =>
{
    const navigate = useNavigate();

    const handleViewButton = () => {
        navigate('/view');
    }
    
    const handleUploadButton = () => {
        navigate('/upload');
    }

    return(<>
        <h1>Select desired action</h1>
        <Button onClick={handleViewButton}>View</Button>
        <Button onClick={handleUploadButton}>Upload</Button>
    </>);
}
 
export default Select;
