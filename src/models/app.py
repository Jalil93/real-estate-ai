import os
import chromadb
from dotenv import load_dotenv
from chromadb.utils import embedding_functions
from openai import OpenAI

openai_ef = embedding_functions.OpenAIEmbeddingFunction(
    api_key=os.environ[
        'OPENAI_API_KEY'], model_name='text-embedding-3-small'
)

chroma_client = chromadb.PersistentClient(path='chroma_persistent_storage')
collection_name = 'document_qa_collection'
collection = chroma_client.get_or_create_collection(name=collection_name, embedding_function=openai_ef)

client = OpenAI(api_key=openai_key)

resp = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
        {
            'role': 'system',
            'content': 'What is the weather in Chantilly VA today?'
        },
        {'role': 'user', 'content': 'What is human life expectancy?'}]
)


print(resp.choices[0].message['content'])






def get_openai_embedding(text):
    response = client.embeddings.create(input=text, model="text-embedding-3-small")
    embedding = response.data[0].embedding
    return embedding

for doc in chunked_documents:
     doc[‘embedding’] = get_openai_embedding(doc)
     collection.upsert(
         ids=[doc["id"]], documents=[doc["text"]], embeddings=[doc["embedding"]]
     )


def query_documents(question, n_results=2):
    results = collection.query(query_texts=question, n_results=n_results)
    relevant_chunks = [doc for sublist in results["documents"] for doc in sublist]

    return relevant_chunks







