import {React, Component} from "react";

export default class Home extends Component {
    render() {
        return (
            <>
                {/* <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '60vh'
                }}>
                    <img src={logo} alt="Nasol" width='300vh' height='300vh' />
                </div> */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '80vh'
                }}>
                    <h1>Validarea documentelor folosind Blockchain</h1>
                </div>
            </>
        );
    }
}