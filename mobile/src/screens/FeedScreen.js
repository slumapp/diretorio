import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native';
import { colors } from '../theme/colors';
import { getPosts } from '../services/api';

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadPosts = async () => {
    setRefreshing(true);
    try {
      const postsData = await getPosts();
      setPosts(postsData);
    } catch (error) {
      console.error('Erro ao carregar posts:', error);
    }
    setRefreshing(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const renderPost = ({ item }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <View style={styles.avatar} />
        <View>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.userLocation}>{item.user.location}</Text>
        </View>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
      
      <Text style={styles.postContent}>{item.content}</Text>
      <Text style={styles.postCategory}>{item.category}</Text>
      
      <View style={styles.postActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>👍 Curtir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>💬 Comentar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.whatsappButton}>
          <Text style={styles.whatsappText}>📞 Chamar no Zap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SLUM</Text>
        <TouchableOpacity>
          <Text style={styles.headerIcon}>💬</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={item => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={loadPosts}
            colors={[colors.primary]}
          />
        }
        style={styles.feed}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum post ainda. Seja o primeiro!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: colors.background 
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: colors.surface,
  },
  headerTitle: {
    fontFamily: 'Graffiti',
    fontSize: 24,
    color: colors.primary,
  },
  headerIcon: {
    fontSize: 24,
  },
  feed: {
    flex: 1,
    paddingHorizontal: 10,
  },
  postCard: {
    backgroundColor: colors.surface,
    marginVertical: 8,
    padding: 15,
    borderRadius: 10,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    marginRight: 10,
  },
  userName: {
    color: colors.text,
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  userLocation: {
    color: colors.text,
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    opacity: 0.7,
  },
  timestamp: {
    color: colors.text,
    fontFamily: 'Roboto-Regular',
    fontSize: 12,
    opacity: 0.7,
    marginLeft: 'auto',
  },
  postContent: {
    color: colors.text,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    marginBottom: 5,
  },
  postCategory: {
    color: colors.secondary,
    fontFamily: 'Roboto-Bold',
    fontSize: 12,
    marginBottom: 10,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  actionText: {
    color: colors.text,
    fontFamily: 'Roboto-Regular',
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  whatsappText: {
    color: '#000',
    fontFamily: 'Roboto-Bold',
  },
  emptyText: {
    color: colors.text,
    textAlign: 'center',
    marginTop: 50,
    fontFamily: 'Roboto-Regular',
  },
});