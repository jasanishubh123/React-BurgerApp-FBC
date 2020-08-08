

import React from 'react'
import Modal from '../../component/UI/Modal/Modal'
import Aux from '../Aux/Aux'

const withErrorHandler=(WrappedComponent,axios)=>{

    return class extends React.Component{

        state={
            error:null
        }
        componentWillMount(){

           this.reqInter= axios.interceptors.request.use(req=>{
                this.setState({error:null})
                return req
            })

           this.resInter= axios.interceptors.response.use(res=>res,error=>{
                this.setState({error:error})
            })
        }

        componentWillUnmount(){
            // console.log("Will Unmount ",this.reqInter,this.resInter)
              axios.interceptors.request.eject(this.reqInter)
              axios.interceptors.request.eject(this.resInter)

        }
        
        errorConfirmHandler=()=>{
            this.setState({error:null})
        }

        render(){
            return(
                <Aux>
                    <Modal show={this.state.error} ModalClosed={this.errorConfirmHandler}>
                       {this.state.error?this.state.error.message:""}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
    


}

export default withErrorHandler