/* import React, { Component, useEffect, useState } from "react";
import axios from "axios";

const Chat = (props) => {



  return (
    <div>
      <br></br>
      <br></br>
      <br></br>

      <h1>This is Chat</h1>


      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default Chat;
 */
import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import { Row, Container } from 'react-bootstrap';
import { useParams, useHistory } from "react-router-dom";

import CurrentUserText from '../../components/CurrentUserText'
import OtherUserText from '../../components/OtherUserText'
import ChatNotification from '../../components/ChatNotification'

import { getCurrentUser, getCurrentChat } from "../../helpers/auth";

//Add socket import here
import {socket} from '../../services/socket'
import {
	Input,
	Label,
	CardBody,
	Col,
	Card
} from "reactstrap";

let styles = {
	chatRoomContainer: {
		marginTop: 76,
        width: 750,
        marginBottom: 10
	},
	header:{
		height: "7vh",
		backgroundColor: 'rgba(16,207,241,0.25)',
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		flexDirection: 'column',
	},
	headerText: {
		fontSize: 20,
	},
	youAppearAsText: {
		fontSize: 14,
		marginTop: 5,
		display: 'flex',
		flexDirection: 'row',
	},
	usernameText:{
		fontWeight: 'bold',
		marginLeft: 3,
		marginRight: 3,
	},
	chatThread: {
		backgroundColor: 'rgba(123,201,218,0.25)',
		flex: 0,
		display: 'flex',
    	flexDirection: 'column',
    	height: "70vh",
    	overflowY: 'auto',
    	width: '45vw',
    	alignSelf: 'center',
    	padding: 20,
    	paddingBottom: 40,
    	border: '1px solid rgba(0, 0, 0, 0.2)',
    	borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8,
    	marginBottom: 15
	},
	messageInputSection: {
		display: 'flex',
		justifyContent: 'flex-start',
	},
	messageTextField: {
		flex: 1
	},
	messageSubmitButton: {
		flex: 0
	}

}

const autoScrollOffset = 100 //offset value that allows screen to auto scroll when you are not exactly at bottom of chat window

const chat1 =()=> {

	const [name, setName] = useState('');
	const [isUserExist, setIsUserExist] = useState(false);
	const [currentUsername, setCurrentUsername] = useState("");
	const [currentUserID, setCurrentUserID] = useState('uid1');
	const [message, setMessage] = useState('');
	const [chatRoomData, setChatRoomData] = useState([]);
	const [initialLoad, setInitialLoad] = useState(true);
    const [currentUser, setCurrentUser] = useState();
    const [groupID, setGroupID] = useState("");

	//Create Ref for managing "auto-scroll"
	const [messagesEndRef, setMessagesEndRef] = useState(React.createRef());

	useEffect(() => {
        let user = getCurrentUser();
        let groupId = getCurrentChat();
        setCurrentUser(user);
        setGroupID(groupId);
        
        console.log(user._id)
        setCurrentUsername(user._id);
		setMessagesEndRef(React.createRef())
		socket.emit("GetMessages", groupId)
		console.log('messagesEndRef..',messagesEndRef)

		socket.on("RetrieveChatRoomData", (chatRoomData) => {
            console.log('chatRoomData', chatRoomData)
			// this.setState({chatRoomData: chatRoomData}, () => shouldScrollToBottom())
			setChatRoomData(chatRoomData)
			shouldScrollToBottom()
		})
	}, [])


	useEffect(() => {
		return () => {
			console.log('componentWillUnmount');
			socket.off("RetrieveChatRoomData")
			socket.off("SetUserData")
		};
	}, []);

	// const handleNameSubmit = (e) => {
	// 	const userData = {userID: name, username: name};
	// 	setCurrentUsername(userData.username)
	// 	setCurrentUserID(userData.userID )
	// 	localStorage.setItem('userID', userData.userID)
	// 	localStorage.setItem('username', userData.username)
	// 	//Notify Socket server is not ready to chat
	// 	socket.emit("UserEnteredRoom", userData)

	// 	setIsUserExist(true)
	// }
	const handleNameChange = event => {
		console.log("handleChange")
		console.log("handleChange...",event.target.value)
		event.preventDefault();
		setName(event.target.value)
	}
	const setMessageData=(message)=>{
		//Set Message being typed in input field
		setMessage(message)
	}

	const sendMessageData=()=>{
		if(message.length > 0){
			//Send chat message to server...
			socket.emit("SendMessage", {message: message, username: `${currentUser.firstName} ${currentUser.lastName}` , userID: currentUser._id, groupId: groupID, timeStamp: null})
			//Clear chat message textfield box
			setMessage('')
		}
	}


	const shouldScrollToBottom=()=>{
		//If user is near the bottom of the chat, automatically navigate them to bottom when new chat message/notification appears
		if (messagesEndRef?.current?.scrollHeight - messagesEndRef?.current?.scrollTop < messagesEndRef?.current?.offsetHeight + autoScrollOffset){
			scrollToBottom()
		}

		//Navigate to end of chat when entering chat the first time
		if(initialLoad){
			scrollToBottom()
			setInitialLoad( false)
		}
	}

	const scrollToBottom=()=>{
		//Scrolls user to end of chat message window
		// messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight ?? 11
	}


	return (
/* 
		<>
		{!isUserExist &&

			<React.Fragment>
				<div className="page-content">
					<Container fluid={true}>
						<Row>
							<Col lg={12}>
								<Card>
									<CardBody>
										<Row>
											<Col md={12}>
												<Row className="mb-2">
													<Label htmlFor="delivery_address"
														   className="col-md-3 col-form-label">
                                                               <br/><br/><br/><br/><br/><br/><br/><br/><br/>
														<span >Enter Chat Room</span>
													</Label>
													<div className="col-md-8">
														<Input
															name="name"
															type="text"
															className="form-control"
															onChange={handleNameChange}
															value={name}
															placeholder="Enter a username"
														/>
													</div>
												</Row>

											</Col>
										</Row>

										<hr className="mb-5" />
										<div className="d-flex flex-wrap gap-2">
											<Button variant="contained" color="primary" onClick={(e) => handleNameSubmit(e)}>
												Enter
											</Button>
										</div>
									</CardBody>
								</Card>
							</Col>
						</Row>
					</Container>
				</div>
			</React.Fragment>} */
			<div className="chat-container">
        <div className="container">
        <>
    {!isUserExist &&
		<Container style = {styles.chatRoomContainer}>

			<Container style ={styles.header}>
				<Row style={styles.headerText}>{groupID}</Row>
			</Container>
			<Container style={styles.chatThread} ref={messagesEndRef}>
				{chatRoomData.map( (messageData, index) => {
                    // console.log('messageData', messageData);
					console.log('currentUsername', currentUsername);
					console.log('msg', messageData.userID);
					if(messageData.userID == currentUsername) {
		
						return <CurrentUserText key={index} username={messageData.username} message={messageData.message}/>
					} else if (messageData.username === '') {
						return <ChatNotification key={index} username={messageData.username} message={messageData.message}/>
					} else {
					
						return <OtherUserText key={index} username={messageData.username} message={messageData.message}/>
					}

				})}


			</Container>
			<Container style={styles.messageInputSection}>
					<TextField
						style= {styles.messageTextField}
						id="input-with-icon-adornment"
						label="Enter Message"
						variant="outlined"
						value={message}
						onChange={(event) => setMessageData(event.target.value)}
						onKeyPress= {(event) => {
							if (event.key === 'Enter') {
							  console.log('Enter key pressed');
							  sendMessageData()
							}
						}}
						InputProps={{
							endAdornment:(
								<InputAdornment position="end">
									<IconButton onClick={() => sendMessageData()}>
										<SendIcon/>
									</IconButton>
								</InputAdornment>
							)
						}}
					/>
			</Container>
		</Container>}
		</>
		</div>
		</div>
	);
}

export default Chat1;