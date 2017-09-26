/**
 * Created by 陈伟达 on 2017/8/29.
 */
import React from 'react'
import {View, Text, FlatList, StyleSheet, RefreshControl, TouchableOpacity, ActivityIndicator} from 'react-native'
import Toolbar from '../Widget/ToolBar'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as Actions from '../actions/MessageAcitons';

class MessagePage extends React.Component {

    _renderMessageBody(text) {
        if (text && text.includes('<m>') && text.includes('</m>')) {
            let index1 = text.indexOf('<m>');
            let index2 = text.indexOf('</m>');
            if (index1 < index2) {
                let head = text.substring(0, index1);
                let tag = text.substring(index1 + 3, index2);
                let end = text.substring(index2 + 4, text.length);
                return(<Text style={styles.content}>
                    {head}<Text style={{color:'#f05c4e'}}>{tag}</Text>{end}</Text>);
            }
        }
        return(<Text style={styles.content}>{text}</Text>)
    }
    _renderError() {
        if (this.props.message.loading) {
            return this._renderRefresh()
        } else {
            return(
                <TouchableOpacity onPress={this._onRefresh.bind(this)}
                                  style={{flex:1, justifyContent:'center', alignItems:'center'}}
                                  activeOpacity={0.7}>
                    <Text>network error</Text>
                </TouchableOpacity>
            )
        }
    }
    _renderNoData() {
        if (this.props.message.loading) {
            return this._renderRefresh()
        } else {
            return (
                <TouchableOpacity onPress={this._onRefresh.bind(this)}
                                  style={{flex:1, justifyContent:'center', alignItems:'center'}}
                                  activeOpacity={0.7}>
                    <Text>no data</Text>
                </TouchableOpacity>
            )
        }
    }
    _renderRefresh() {
        return(
            <ActivityIndicator style={{flex:1, justifyContent:'center', alignItems:'center'}}
                size="large"
                color='#f05c4e'
            />
        )
    }

    _renderMain() {
        if (this.props.message.error) {
            console.log("error");
            return this._renderError()
        } else {
            return this._renderList()
        }
    }
    _renderList() {
        if (this.props.message.noData) {
            console.log("nodata");
            return this._renderNoData()
        } else {
            console.log("list");
            return (
                <FlatList data={this.props.message.messageList}
                          keyExtractor={(item, index) => index}
                          renderItem={({item}) => (
                              <View style={styles.item}>
                                  <View style={styles.time}>
                                      <Text>
                                          {item.messageTime}
                                      </Text>
                                  </View>
                                  <View style={styles.box}>
                                      <Text style={{marginLeft: 5, marginTop: 5}}>系统消息</Text>
                                      <View style={styles.div}/>
                                      {this._renderMessageBody(item.content)}
                                      {/*<Text style={{marginLeft:5, marginTop:5, marginBottom:5}}>{item.content}</Text>*/}
                                  </View>
                              </View>
                          )}
                          onEndReached={this._onLoadMore.bind(this)}
                          style={styles.list}
                          refreshControl={
                              <RefreshControl
                                  refreshing={this.props.message.loading}
                                  onRefresh={this._onRefresh.bind(this)}
                              />
                          }
                          showsVerticalScrollIndicator={false} //hide srcollbar
                />
            )
        }
    }

    _onRefresh() {
        this.props.actions.fetchMessageList();
    }
    _onLoadMore() {
        if (this.props.message.canLoadMore) {
            this.props.actions.loadMore(this.props.message.pageNum + 1);
        }
    }

    render() {
        return(
            <View style={{flex:1, backgroundColor:'#f0f0f0'}}>
                <Toolbar title='消息中心'/>
                {this._renderMain()}
            </View>
        );
    }

    componentDidMount() {
        //获取消息列表
        this.props.actions.fetchMessageList();
    }
}

const mapStateToProps = (state) => {
    return {
        message: state.messageReducer,
    }
};
const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators(Actions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessagePage);

const styles = StyleSheet.create({
    list:{
        marginLeft:10,
        marginRight:10,
    },

    item:{
        flex:1,
        flexDirection:'column',
        marginTop:5,
        marginBottom:5,
    },

    time:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        marginTop:5
    },

    box:{
        flex:1,
        flexDirection:'column',
        justifyContent:'flex-start',
        backgroundColor:'white',
        borderRadius:4,
        marginTop:5
    },

    div:{
        flex:1,
        flexDirection:'column',
        backgroundColor:"#d9d9d9",
        height:1,
        marginTop:5
    },

    content:{
        marginLeft:5,
        marginTop:5,
        marginBottom:5
    }
});