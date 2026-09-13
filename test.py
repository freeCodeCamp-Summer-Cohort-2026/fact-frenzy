from collections.abc import Iterable


def sum_even_numbers(numbers: Iterable[int]) -> int:
    """Given an iterable of integers, return the sum of all even numbers in the iterableaaaaaaaaaaaaaaaaaaa."""
    return sum(num for num in numbers if num % 2 == 0)
