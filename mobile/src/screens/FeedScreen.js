import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, RefreshControl, Alert } from 'react-native';
import { colors } from '../theme/colors';
import { getPosts, checkHealth } from '../services/api';

export default function FeedScreen() {
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [dbStatus, setDbStatus] = useState('Verificando...');

  const loadPosts = async () => {
    setRefreshing(true);
    try {
      const health = await checkHealth();
      setDbStatus(health.database);
      
      const postsData = await getPosts();
      setPosts(postsData);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os posts');
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
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.userLocation}>{item.user.location}</Text>
        </View>
        <Text style={styles.timestamp}>{item.timestamp}</Text>
      </View>
      
      <Text style={styles.postContent}>{item.content}</Text>
      
      <View style={styles.categoryBadge}>
        <Text style={styles.categoryText}>{item.category}</Text>
      </View>
      
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
        <View>
          <Text style={styles.headerTitle}>SLUM</Text>
          <Text style={styles.dbStatus}>Banco: {dbStatus}</Text>
        </View>
        <TouchableOpacity onPress={loadPosts}>
          <Text style={styles.refreshButton}>🔄</Text>
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
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum post ainda</Text>
            <Text style={styles.emptySubtext}>Seja o primeiro a postar na sua quebrada! 🚀</Text>
          </View>
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
    fontSize: 24,
    color: colors.primary,
    fontWeight: 'bold',
  },
  dbStatus: {
    fontSize: 12,
    color: colors.text,
    opacity: 0.7,
    marginTop: 4,
  },
  refreshButton: {
    fontSize: 24,
    color: colors.text,
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
  userInfo: {
    flex: 1,
  },
  userName: {
    color: colors.text,
    fontSize: 16,
    fontWeight: 'bold',
  },
  userLocation: {
    color: colors.text,
    fontSize: 12,
    opacity: 0.7,
  },
  timestamp: {
    color: colors.text,
    fontSize: 12,
    opacity: 0.7,
  },
  postContent: {
    color: colors.text,
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 20,
  },
  categoryBadge: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 10,
  },
  categoryText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: 'bold',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#444',
    paddingTop: 10,
  },
  actionButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  actionText: {
    color: colors.text,
  },
  whatsappButton: {
    backgroundColor: '#25D366',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  whatsappText: {
    color: '#000',
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
  },
  emptyText: {
    color: colors.text,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  emptySubtext: {
    color: colors.text,
    opacity: 0.7,
    textAlign: 'center',
  },
});