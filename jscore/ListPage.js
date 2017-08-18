/**
 * Created by 陈伟达 on 2017/8/18.
 */
import React, {Component} from 'react';
import {
    View,
    ListView,
    Text,
    StyleSheet,
    ToastAndroid,
} from 'react-native'
import ListItem from './Widget/ListItem';

export default class ListPage extends Component {
    static navigationOptions = ({navigation}) => ({
        title:'List'
    });

    constructor() {
        super();
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            ds:ds,
            dataSource: ds.cloneWithRows([]),
        };
    }

    componentDidMount() {
        this._refreshData(this.state.ds);
    }

    _refreshData(ds) {
        fetch('http://jandan.net/?oxwlxojflwblxbsapi=jandan.get_ooxx_comments?page=1')
            .then((response) => response.json())
            .then((responseJSON) => {
                ToastAndroid.show(responseJSON.status, ToastAndroid.SHORT);
                this.setState({
                    dataSource:ds.cloneWithRows(responseJSON.posts)
                })
            })
            .catch((error) => {
                ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
            })
    }

    render() {
        return (
            <ListView
                dataSource={this.state.dataSource}
                // renderRow={(rowData) => <Text style={styles.row}>{rowData.type}</Text>}
                renderRow={(rowData) => <ListItem uri={rowData.comments.length < 1?"":JSON.stringify(rowData.comments[0])}
                                                  text={rowData.title}/>}
            />
        );
    }
}

const styles = StyleSheet.create({
   row: {

   }
});