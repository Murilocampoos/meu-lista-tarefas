/**
 * src/database/profileRepository.ts — Repositório de Perfil (Camada de Dados)
 *
 * Este repositório gerencia o perfil do usuário, que é um REGISTRO ÚNICO
 * (diferente de `taskRepository` que gerencia múltiplos registros).
 *
 * Conceitos importantes neste arquivo:
 * ─────────────────────────────────────
 * 1. UPSERT (UPDATE + INSERT):
 *    Usamos `INSERT OR REPLACE` — se o registro com id=1 não existe, insere;
 *    se já existe, substitui. Isso elimina a necessidade de checar antes.
 *
 * 2. ID FIXO (sempre 1):
 *    Como só existe um perfil por app, sempre operamos com `id = 1`.
 *    Não precisamos de AUTOINCREMENT (usado para múltiplos registros).
 *
 * 3. DADOS VAZIOS POR PADRÃO:
 *    Quando o usuário abre o app pela primeira vez, o perfil não existe.
 *    A tela exibe campos vazios e permite preenchimento/salvamento.
 */

import { getDatabase } from './database';
import { UserProfile, SaveProfileInput } from '../types/profile';

// =============================================================================
// READ — Operação de Leitura
// =============================================================================

/**
 * Retorna o perfil do usuário.
 *
 * Como só existe um perfil (id=1), buscamos com `LIMIT 1` para garantir
 * que a query nunca retorne mais de um resultado.
 *
 * @returns O perfil do usuário ou `null` se ainda não foi criado
 */
export async function getProfile(): Promise<UserProfile | null> {
  const db = await getDatabase();

  return db.getFirstAsync<UserProfile>(
    'SELECT * FROM profile WHERE id = 1 LIMIT 1',
  );
}

// =============================================================================
// CREATE/UPDATE — Operação Unificada (Upsert)
// =============================================================================

/**
 * Salva (cria ou atualiza) o perfil do usuário.
 *
 * Utiliza `INSERT OR REPLACE` para realizar um upsert atômico com id=1 fixo.
 *
 * @param input Dados do perfil a serem salvos (name, email, photoUri)
 */
export async function saveProfile(input: SaveProfileInput): Promise<void> {
  const db = await getDatabase();

  await db.runAsync(
    'INSERT OR REPLACE INTO profile (id, name, email, photoUri) VALUES (1, ?, ?, ?)',
    input.name,
    input.email,
    input.photoUri,
  );
}
