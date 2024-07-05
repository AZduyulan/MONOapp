import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal } from 'react-native';
import Colors from '../Colors';
import TodoModal from './TodoModal';
import tempData from '../tempData';

export default class TodoList extends React.Component {
    state = {
        showListVisible: false
    }
    toggleListModal() {
        this.setState({ showListVisible: !this.state.showListVisible })
    }



    render() {
        const list = this.props.list;
        const completedCount = list.todos.filter(todo => todo.completed).length;
        const remainingCount = list.todos.length - completedCount;

        return (
            <View>
                <Modal
                    animationType="Slide"
                    visible={this.state.showListVisible}
                    onRequestClose={() => this.toggleListModal()}>

                    <TodoModal list={list} closeModal={() => this.toggleListModal()} updateList={this.props.updateList}>

                    </TodoModal>

                </Modal>
                <TouchableOpacity style={[styles.listContainer, { backgroundColor: list.color }]} onPress={() => this.toggleListModal()}>
                    <Text style={styles.listTitle} numberOfLines={1}>
                        {list.name}
                    </Text>
                    <View>
                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.count}>{remainingCount}</Text>
                            <Text style={styles.subtitle}>ACABA</Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Text style={styles.count}>{completedCount}</Text>
                            <Text style={styles.subtitle}>KAPALI</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>

        );
    }


};

const styles = StyleSheet.create({
    listContainer: {
        paddingVertical: 32,
        paddingHorizontal: 16,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        Width: 200
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: Colors.white,
        marginBottom: 18

    },
    count: {
        fontSize: 48,
        fontWeight: "200",
        color: Colors.white
    },
    subtitle: {
        fontSize: 12,
        fontWeight: "700",
        color: Colors.white
    }


}) 