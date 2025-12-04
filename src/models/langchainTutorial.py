import os

from langchain.chains.sequential import SimpleSequentialChain, SequentialChain
from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI
from langchain.chains import LLMChain


def main():
    llm = OpenAI(temperature=0.70)
    # response = llm("I want to open a restaurant for Italian food. Suggest a fancy name for this.")
    # print(response)

    restaurant_name_template = PromptTemplate(
        input_variables = ['cuisine'],
        template = 'I want to open a restaurant for {cuisine} food, Suggest a fancy name for the restaurant.'
    )
    name_chain = LLMChain(llm=llm, prompt=restaurant_name_template, output_key='restaurant_name')
    # print(name_chain.run("Persian"))


    restaurant_items_template = PromptTemplate(
            input_variables=['restaurant_name'],
            template = 'Suggest some menu items for {restaurant_name}. Return it as a comma separated list.'
    )
    items_chain = LLMChain(llm=llm, prompt=restaurant_items_template, output_key='menu_items')
    # print(items_chain.run(name_chain.run("Pakistani")))

    full_chain = SequentialChain(
        chains=[name_chain, items_chain],
        input_variables=['cuisine'],
        output_variables=['restaurant_name', 'menu_items'])
    print(full_chain({'cuisine': 'Tamil Nadu'}))

if __name__ == "__main__":
    main()

