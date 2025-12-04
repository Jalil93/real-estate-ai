import create_agent
from langgraph.prebuilt import create_react_agent


def get_weather(city: str):
    return f"It's always sunny in {city}"



def main():
    agent = create_agent(
        model="anthropic:claude-3-7-sonnet-latest",
        tools=[get_weather],
        prompt="You are a helpful assistant"
    )

    agent.invoke(
        {"messages":[{"role": "user", "content":"what is the weather in sf"}]}
    )

if __name__ == "__main__":
    main()