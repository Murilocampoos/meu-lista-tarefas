import '../global.css';
import React from 'react';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2563eb',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: 'Minhas Tarefas',
        }}
      />
      <Stack.Screen
        name="form"
        options={{
          title: 'Nova Tarefa',
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: '👤 Meu Perfil',
        }}
      />
    </Stack>
  );
}
