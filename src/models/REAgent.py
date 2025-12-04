import streamlit as st
import os

from langchain.chains.sequential import SimpleSequentialChain, SequentialChain
from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from langchain.chains import LLMChain

from langchain import HuggingFaceHub


"""
To run enter: streamlit run NAME-OF-FILE
"""

st.title("Realtor")

# selectedCuisine = st.sidebar.selectbox("Pick a Cuisine", ("American", "Thai", "Indian", "Chinese", "Middle-Eastern", "Mexican", "Ethiopian"))

def real_estate_text_classification(text):

    summarizer = HuggingFaceHub(
        repo_id="facebook/bart-large-cnn",
        model_kwards={"temperature":0, "max_length":180}
    )

    return
    # pipe = pipeline("text-generation", model="distilgpt2")
    # llm = HuggingFacePipeline(pipeline=pipe)
    # response = llm.invoke(text)

    # llm = OpenAI(temperature=0.70)
    # # response = llm("I want to open a restaurant for Italian food. Suggest a fancy name for this.")
    # # print(response)
    #
    # restaurant_name_template = PromptTemplate(
    #     input_variables = ['cuisine'],
    #     template = 'I want to open a restaurant for {cuisine} food, Suggest a fancy name for the restaurant.'
    # )
    # name_chain = LLMChain(llm=llm, prompt=restaurant_name_template, output_key='restaurant_name')
    # # print(name_chain.run("Persian"))
    #
    #
    # restaurant_items_template = PromptTemplate(
    #     input_variables=['restaurant_name'],
    #     template = 'Suggest 5 menu items for {restaurant_name}. Return it as a comma separated list.'
    # )
    # items_chain = LLMChain(llm=llm, prompt=restaurant_items_template, output_key='menu_items')
    # # print(items_chain.run(name_chain.run("Pakistani")))
    #
    # full_chain = SequentialChain(
    #     chains=[name_chain, items_chain],
    #     input_variables=['cuisine'],
    #     output_variables=['restaurant_name', 'menu_items'])
    #
    # response = full_chain(cuisine)
    # print(response['restaurant_name'])
    # print(response['menu_items'])
    return response

if selectedCuisine:
    response = real_estate_text_classification("Help with Real estate real brief")
    st.header("Your AI Real Estate assistant")
    st.write(response)

    # menu_items = response['menu_items'].split(",")
    # st.write("**Menu Items**")
    # for item in menu_items:
    #     st.write('-', item)