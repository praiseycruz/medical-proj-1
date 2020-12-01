import React from 'react'
import { Form, Row, Col, Button, Modal, Card, Tabs, Tab } from 'react-bootstrap'
//import our style for modal search
import { ModalSearchStyle, ModalSearchItems } from './styled-components/ModalSearchStyle'

function ModalSearch(props) {
		
	//extract properties
	const { show, label, closeModal, results, query } = props

	//initiate with null
	let displayResults = null

	//get total results and entries
	let { total, entry: entries } = results

	//initiate with items an empty array
	let items = []

	//for items display
	let itemsDisplay = null


	//if total is greater than 0 then
	if (total > 0) {

		//build our items through iteration of entry

		entries.map( entry => {
			let { resource } = entry
			let buildItem = {
				name: `${resource.name[0].given} ${resource.name[0].family}` 
			}
			items.push(buildItem)
		})

		//iterate build items for display purpose
		itemsDisplay = items.map( (item, key) => {
			return (<ModalSearchItems key={key}>{item.name}</ModalSearchItems>)
		})

	} else {
		//set a display for no results
		itemsDisplay = (<div>No results found for "{query}".</div>)
	}

	//display now our modal
	return (
		<Modal
             show={show}
             size="lg"
             onHide={() => closeModal()}
             aria-labelledby="contained-modal-title-vcenter"
             centered
         >
             <Modal.Header closeButton>
                <h5>{`${label} "${query}"`}</h5>
             </Modal.Header>
             <Modal.Body>
                <div>
                	{
                		itemsDisplay
                	}
               	</div>
             </Modal.Body>
         </Modal>
	)
}

export default ModalSearch