import React from 'react'
import {
    Divider,
    Image,
    Container,
    Button,
  } from 'semantic-ui-react';
import MainHeader from '../components/MainHeader'
import PageNotFoundImage from '../assets/404.png'

export default function PageNotFound(props) {
    return (
        <>
            <MainHeader {...props} />
            <Container>
                    <div style={{marginLeft: '10%'}}>
                        <Image src={PageNotFoundImage}  
                            style= {{
                                height: '250px',
                        }}
                        />
                        <Divider hidden/>
                        <Button content="Back to Home" positive onClick={()=>props.history.push("/")} />
                    </div>
                    <Divider hidden/><Divider hidden/><Divider hidden/>
            </Container>
        </>
    )
}
