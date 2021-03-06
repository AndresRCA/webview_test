import React from "react";
import { View } from "react-native";
import { Text, ListItem, Icon } from "native-base";

/*
List of props: doc_name, navigation, type, doc_items
 */
//const doc_data = require('../views/docs/+this.props.doc_name.lowercase()+/db.json'); //something like this
const doc_data = require('../views/docs/typescript/db.json');

export default class DocItem extends React.Component {
	constructor(props) {
		super(props);
		this.state = { isOpen: false, list: [] }; //list contains a bunch of JSX
	}

  //Here I render everything under the type of item
  renderList(doc_items) {
    let list = [];
    doc_items.forEach((item) => { //item is {name, path, type}
      if(item.path.indexOf('#') == -1){ //for now I don't want to involve links inside the html
        list.push(
          <ListItem 
            button
            onPress={() => this.props.navigation.navigate('DocView', {title: item.type, subtitle: item.name, doc_html: doc_data[item.path]})}
          >
            <Text>{item.name}</Text>
          </ListItem>
        );
      }
    });
    return list;
  }

  componentDidMount() {
    this.setState({ list: this.renderList(this.props.doc_items) });
  }

  render() {
    return (
      <View>
      	<ListItem itemHeader
          button
          onPress={() => this.setState({isOpen: !this.state.isOpen})}
        >
          <Icon type='FontAwesome' name={(this.state.isOpen)? 'folder-open' : 'folder'} /><Text> {this.props.type}</Text>
        </ListItem>
        { this.state.isOpen && this.state.list }
      </View>
    );
  }
}