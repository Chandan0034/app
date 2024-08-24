const data = [
    {
      title: 'Bubble Sort',
      code: `#include<iostream>\n\nusing namespace std;\n\nvoid bubbleSort(int arr[], int n) {\n\n\tfor (int i = 0; i < n - 1; i++) {\n\n\t\tfor (int j = 0; j < n - i - 1; j++) {\n\n\t\t\tif (arr[j] > arr[j + 1]) {\n\n\t\t\t\tswap(arr[j], arr[j + 1]);\n\n\t\t\t}\n\n\t\t}\n\n\t}\n\n}`,
      complement: 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order.'
    },
    {
      title: 'Selection Sort',
      code: `#include<iostream>\n\nusing namespace std;\n\nvoid selectionSort(int arr[], int n) {\n\n\tfor (int i = 0; n - 1; i++) {\n\n\t\tint minIndex = i;\n\n\t\tfor (int j = i + 1; j < n; j++) {\n\n\t\t\tif (arr[j] < arr[minIndex]) {\n\n\t\t\t\tminIndex = j;\n\n\t\t\t}\n\n\t\t}\n\n\t\tswap(arr[minIndex], arr[i]);\n\n\t}\n\n}`,
      complement: 'Selection sort is an in-place comparison sorting algorithm that divides the input list into two parts: the sublist of items already sorted and the sublist of items remaining to be sorted.'
    },
    {
      title: 'Insertion Sort',
      code: `#include<iostream>\n\nusing namespace std;\n\nvoid insertionSort(int arr[], int n) {\n\n\tfor (int i = 1; i < n; i++) {\n\n\t\tint key = arr[i];\n\n\t\tint j = i - 1;\n\n\t\twhile (j >= 0 && arr[j] > key) {\n\n\t\t\tarr[j + 1] = arr[j];\n\n\t\t\tj--;\n\n\t\t}\n\n\t\tarr[j + 1] = key;\n\n\t}\n\n}`,
      complement: 'Insertion sort is a simple sorting algorithm that builds the final sorted array (or list) one item at a time. It is less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort.'
    },
    {
      title: 'Merge Sort',
      code: `#include<iostream>\n\nusing namespace std;\n\nvoid merge(int arr[], int l, int m, int r) {\n\n\tint n1 = m - l + 1;\n\n\tint n2 = r - m;\n\n\tint L[n1], R[n2];\n\n\tfor (int i = 0; i < n1; i++)\n\n\t\tL[i] = arr[l + i];\n\n\tfor (int j = 0; j < n2; j++)\n\n\t\tR[j] = arr[m + 1 + j];\n\n\tint i = 0, j = 0, k = l;\n\n\twhile (i < n1 && j < n2) {\n\n\t\tif (L[i] <= R[j]) {\n\n\t\t\tarr[k] = L[i];\n\n\t\t\ti++;\n\n\t\t} else {\n\n\t\t\tarr[k] = R[j];\n\n\t\t\tj++;\n\n\t\t}\n\n\t\tk++;\n\n\t}\n\n\twhile (i < n1) {\n\n\t\tarr[k] = L[i];\n\n\t\ti++;\n\n\t\tk++;\n\n\t}\n\n\twhile (j < n2) {\n\n\t\tarr[k] = R[j];\n\n\t\tj++;\n\n\t\tk++;\n\n\t}\n\n}\n\nvoid mergeSort(int arr[], int l, int r) {\n\n\tif (l >= r)\n\n\t\treturn;\n\n\tint m = l + (r - l) / 2;\n\n\tmergeSort(arr, l, m);\n\n\tmergeSort(arr, m + 1, r);\n\n\tmerge(arr, l, m, r);\n\n}`,
      complement: 'Merge Sort is an efficient, stable, and comparison-based sorting algorithm. It uses divide and conquer to divide the input array into two halves, sort them, and then merge them back together.'
    },
    {
      title: 'Quick Sort',
      code: `#include<iostream>\n\nusing namespace std;\n\nint partition(int arr[], int low, int high) {\n\n\tint pivot = arr[high];\n\n\tint i = (low - 1);\n\n\tfor (int j = low; j <= high - 1; j++) {\n\n\t\tif (arr[j] < pivot) {\n\n\t\t\ti++;\n\n\t\t\tswap(arr[i], arr[j]);\n\n\t\t}\n\n\t}\n\n\tswap(arr[i + 1], arr[high]);\n\n\treturn (i + 1);\n\n}\n\nvoid quickSort(int arr[], int low, int high) {\n\n\tif (low < high) {\n\n\t\tint pi = partition(arr, low, high);\n\n\t\tquickSort(arr, low, pi - 1);\n\n\t\tquickSort(arr, pi + 1, high);\n\n\t}\n\n}`,
      complement: 'Quick Sort is an efficient, comparison-based, and divide-and-conquer sorting algorithm. It selects a "pivot" element and partitions the array around the pivot, sorting the elements recursively.'
    },
    {
      title: 'Heap Sort',
      code: `#include<iostream>\n\nusing namespace std;\n\nvoid heapify(int arr[], int n, int i) {\n\n\tint largest = i;\n\n\tint l = 2 * i + 1;\n\n\tint r = 2 * i + 2;\n\n\tif (l < n && arr[l] > arr[largest])\n\n\t\tlargest = l;\n\n\tif (r < n && arr[r] > arr[largest])\n\n\t\tlargest = r;\n\n\tif (largest != i) {\n\n\t\tswap(arr[i], arr[largest]);\n\n\t\theapify(arr, n, largest);\n\n\t}\n\n}\n\nvoid heapSort(int arr[], int n) {\n\n\tfor (int i = n / 2 - 1; i >= 0; i--)\n\n\t\theapify(arr, n, i);\n\n\tfor (int i = n - 1; i >= 0; i--) {\n\n\t\tswap(arr[0], arr[i]);\n\n\t\theapify(arr, i, 0);\n\n\t}\n\n}`,
      complement: 'Heap Sort is a comparison-based sorting algorithm that uses a binary heap data structure. It involves building a heap from the input data and then repeatedly extracting the maximum element from the heap and reconstructing the heap until no elements remain.'
    },
    {
      title: 'Binary Search',
      code: `#include<iostream>\n\nusing namespace std;\n\nint binarySearch(int arr[], int l, int r, int x) {\n\n\twhile (l <= r) {\n\n\t\tint m = l + (r - l) / 2;\n\n\t\tif (arr[m] == x)\n\n\t\t\treturn m;\n\n\t\tif (arr[m] < x)\n\n\t\t\tl = m + 1;\n\n\t\telse\n\n\t\tr = m - 1;\n\n\t}\n\n\treturn -1;\n\n}`,
      complement: 'Binary Search is a highly efficient algorithm for finding an element in a sorted array. It repeatedly divides the search interval in half, and if the value of the search key is less than the item in the middle of the interval, the interval is narrowed to the lower half; otherwise, it is narrowed to the upper half. The process continues until the item is found or the interval is empty.'
    },
    {
      title: 'Two-Pointer Algorithm:',
        code: `#include <iostream>\n\nusing namespace std;\n\nbool findPair(int arr[], int n, int target) {\n\n\tint left = 0, right = n - 1;\n\n\twhile (left < right) {\n\n\t\tint sum = arr[left] + arr[right];\n\n\t\tif (sum == target) {\n\n\t\t\tcout<<"Pair found: ("<<arr[left]<<", "<<arr[right]<<")"<<endl;\n\n\t\t\treturn true;\n\n\t\t} else if (sum < target) {\n\n\t\t\tleft++;\n\n\t\t} else {\n\n\t\t\tright--;\n\n\t\t}\n\n\t}\n\n\tcout <<"No pair found"<<endl;\n\n\treturn false;\n\n}`,
        complement: 'The two-pointer algorithm is an efficient technique to solve problems involving searching pairs in a sorted array or subarray. It uses two pointers that move towards each other to find pairs that meet a specific condition, such as summing up to a target value.'
    }
  ];
  
  export default data;
  