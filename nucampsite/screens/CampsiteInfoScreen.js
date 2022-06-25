import { FlatList, StyleSheet, Text, View, Modal, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import RenderCampsite from '../features/campsites/RenderCampsite';
import { toggleFavorite } from '../features/favorites/favoritesSlice';
import { useState } from 'react';
import { Rating } from 'react-native-elements';
import { postComment } from '../features/comments/commentsSlice';




const CampsiteInfoScreen = ({ route }) => {
    const { campsite } = route.params;
    const comments = useSelector((state) => state.comments);
    const favorites = useSelector((state) => state.favorites);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false)
    const [rating, setRating] = useState('')
    const [author, setAuthor] = useState('')
    const [text, setText] = useState('')
    //const { rating: 5, author: '', text: '' } 

    const handleSubmit = () => {

        const newComment = {
            author,
            rating,
            text,
            campsiteId: campsite.id
        };
        dispatch(postComment(newComment))
        setShowModal(!showModal)
    }
    const resetForm = () => {
        setAuthor('');
        setRating('');
        setText('');
        // this.state.author;
        //this.state.rating;
        // this.state.text;
        // This is a function component, we don't need to use this, setState
    };

    const renderCommentItem = ({ item }) => {
        return (
            <View style={styles.commentItem}>
                <Text style={{ fontSize: 14 }}>{item.text}</Text>
                <Rating rating={startingValue} imageSize='10' style={{ alignItems: 'flex-start', paddingVertical: '5%', readonly }} />
                <Text style={{ fontSize: 12 }}>
                    {`-- ${item.author}, ${item.date}`}
                </Text>
            </View>
        );
    };

    return (
        <>
            <FlatList
                data={comments.commentsArray.filter(
                    (comment) => comment.campsiteId === campsite.id
                )}
                renderItem={renderCommentItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{
                    marginHorizontal: 20,
                    paddingVertical: 20
                }}
                ListHeaderComponent={
                    <>
                        <RenderCampsite
                            campsite={campsite}
                            isFavorite={favorites.includes(campsite.id)}
                            markFavorite={() => dispatch(toggleFavorite(campsite.id))}
                            onShowModal={() => setShowModal(!showModal)}
                        />
                        <Text style={styles.commentsTitle}>Comments</Text>
                    </>
                }
            />
            <Modal
                animationType='slide'
                transparent={false}
                visible={showModal}
                onRequestClose={() => setShowModal(!showModal)}
            >
                <View style={styles.modal}>
                    <Rating
                        showRating
                        startingValue={rating}
                        imageSize='40'
                        onFinishRating={(rating) => setRating(rating)}
                        style={{ paddingVertical: 10 }}
                    />
                    <Input placeholder='Author'
                        leftIcon='user-o'
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={(author) => setAuthor(author)}
                        style={{ margin: 10 }}
                        value=''></Input>
                    <Input placeholder='Comment'
                        leftIcon='comment-o'
                        leftIconContainerStyle={{ paddingRight: 10 }}
                        onChangeText={(text) => setText(text)}
                        style={{ margin: 10 }}
                        value=''></Input>
                    <View style={{ margin: 10 }}>
                        <Button
                            onPress={() => {
                                handleSubmit(author, rating, text, campsiteId)
                                resetForm()
                            }
                            }
                            title='Submit'
                            color='#5637DD'

                        />
                    </View>
                    <View style={{ margin: 10 }}>
                        <Button
                            onPress={() => {
                                handleSubmit(!showModal)
                                resetForm()
                            }
                            }
                            title='Cancel'
                            color='#808080'

                        />
                    </View>
                </View>
            </Modal>
        </>
    );

};

const styles = StyleSheet.create({
    commentsTitle: {
        textAlign: 'center',
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        color: '#43484D',
        padding: 10,
        paddingTop: 30
    },
    commentItem: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    }
});

export default CampsiteInfoScreen;